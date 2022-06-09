import * as React from "react";
import { useIntl } from "react-intl";
// import { RouteComponentProps } from "react-router";
import { Box } from "@mui/material";
import { prodListHeaderCommonMsg } from "@temp/intl";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import {
  NotFound,
  OfflinePlaceholder,
  OverlayContext,
  // OverlayTheme,
  // OverlayType,
} from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  getMicrositeId,
  isMicrosite,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import { builderSearchQuery, TypedSearchProductsQuery } from "./queries";
import { useAuth } from "@nautical/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
// import ReactSVG from "react-svg";
// import logoImg from "../../images/logo.svg";
import { useParams } from "react-router";
import StorePage from "../Builder/StorePage";
import {
  BuilderSearchProducts,
  BuilderSearchProductsVariables,
} from "./gqlTypes/BuilderSearchProducts";
import { useQuery } from "@apollo/client";
import { Loader } from "@components/atoms";
// import { useQuery } from "@apollo/client";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

export const FilterQuerySet = {
  encode(valueObj) {
    console.info("ENCODE");
    console.info(valueObj);
    const str = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    console.info("DECODE");
    console.info(strValue);
    const obj = {};
    const propsWithValues = strValue?.split(".")?.filter((n) => n);
    propsWithValues?.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

// export const View: React.FC<ViewProps> = ({ match }) => {
export const View: React.FC<any> = ({ logo }) => {
  console.info("SEARCH VIEW");
  const params = useParams();
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [search, setSearch] = useQueryParam("q", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const intl = useIntl();

  const { user } = useAuth();

  const { loginForProducts, builderKey } = React.useContext(ShopContext);

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
  };

  const [afterFilters, setAfterFilters] = useQueryParam("after");
  const [beforeFilters, setBeforeFilters] = useQueryParam("before");
  const [firstFilters, setFirstFilters] = useQueryParam("first");
  const [lastFilters, setLastFilters] = useQueryParam("last");

  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    after: afterFilters,
    before: beforeFilters,
    first: !lastFilters && !firstFilters ? PRODUCTS_PER_PAGE : firstFilters,
    last: lastFilters,
    id: getGraphqlIdFromDBId(params.id, "Category"),
    query: search || null,
    microsite: !!isMicrosite() ? getMicrositeId() : null,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const sortOptions = [
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
      value: null,
    },
    {
      label: "Newest",
      value: "-created_at",
    },
    {
      label: "Oldest",
      value: "created_at",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
      value: "price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
      value: "-price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
      value: "name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
      value: "-name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
      value: "updated_at",
    },
    {
      label: intl.formatMessage(
        prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc
      ),
      value: "-updated_at",
    },
  ];

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              (item) => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  const { data: builderSearchData } = useQuery<
    BuilderSearchProducts,
    BuilderSearchProductsVariables
  >(
    builderSearchQuery,
    // @ts-ignore
    { variables: variables }
  );

  const loadNextPage = () => {
    setBeforeFilters(null);
    setLastFilters(null);
    setAfterFilters(builderSearchData.productList.pageInfo.endCursor);
    setFirstFilters(PRODUCTS_PER_PAGE);
  };

  const loadPrevPage = () => {
    setAfterFilters(null);
    setFirstFilters(null);
    setBeforeFilters(builderSearchData.productList.pageInfo.startCursor);
    setLastFilters(PRODUCTS_PER_PAGE);
  };

  return !user && loginForProducts ? (
    <>
      <OverlayContext.Consumer>
        {(overlayContext) => (
          <Box className="products-hidden-state">
            <Box>
              {/* <img src={logoImg} className="products-hidden-logo" /> */}
              {logo}
              {/* <ReactSVG path={logoImg} className="products-hidden-logo" /> */}
              {/* <ReactSVG path={logoImg} style={{ width: 400 }} /> */}
            </Box>
            <Box className="products-hidden-text">
              Login required to view products
            </Box>
            {/* <Box>
              <button
                className="products-login-button"
                onClick={() =>
                  overlayContext.show(OverlayType.login, OverlayTheme.right)
                }
              >
                <span className="text">Login</span>
                <span className="icon">
                  <svg
                    aria-hidden="true"
                    data-prefix="far"
                    data-icon="long-arrow-right"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    data-fa-i2svg=""
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M295.515 115.716l-19.626 19.626c-4.753 4.753-4.675 12.484.173 17.14L356.78 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h344.78l-80.717 77.518c-4.849 4.656-4.927 12.387-.173 17.14l19.626 19.626c4.686 4.686 12.284 4.686 16.971 0l131.799-131.799c4.686-4.686 4.686-12.284 0-16.971L312.485 115.716c-4.686-4.686-12.284-4.686-16.97 0z"
                    ></path>
                  </svg>
                </span>
              </button>
            </Box> */}
          </Box>
        )}
      </OverlayContext.Consumer>
    </>
  ) : // @ts-ignore
  builderKey ? (
    <NetworkStatus>
      {(isOnline) => {
        if (builderSearchData && builderSearchData.productList === null) {
          return <NotFound />;
        }

        if (!isOnline) {
          return <OfflinePlaceholder />;
        }

        const canDisplayFilters =
          !!builderSearchData?.attributeList?.attributes &&
          !!builderSearchData?.productList?.products;

        if (canDisplayFilters) {
          return (
            <StorePage
              search={builderSearchData}
              loadNextPage={loadNextPage}
              loadPrevPage={loadPrevPage}
            />
          );
        } else {
          return <Loader />;
        }

        // <TypedBuilderSearchProductsQuery
        //   variables={variables}
        //   errorPolicy="all"
        //   loaderFull
        // >
        //   {({ loading, data, loadMore }) => {
        //     const canDisplayFilters =
        //       !!data?.attributeList?.attributes && !!data?.productList?.products;

        //     if (canDisplayFilters) {
        //       const handleLoadMore = () =>
        //         loadMore(
        //           (prev, next) => ({
        //             ...prev,
        //             productList: {
        //               ...prev.productList,
        //               products: [...prev.productList.products, ...next.productList.products],
        //               pageInfo: next.productList.pageInfo,
        //             },
        //           }),
        //           { after: data.productList.pageInfo.endCursor }
        //         );

        //       return (
        //         <StorePage search={data} loadMore={handleLoadMore} />
        //       );
        //     }

        //     if (data && data.productList === null) {
        //       return <NotFound />;
        //     }

        //     if (!isOnline) {
        //       return <OfflinePlaceholder />;
        //     }
        //   }}
        // </TypedBuilderSearchProductsQuery>
      }}
    </NetworkStatus>
  ) : (
    <NetworkStatus>
      {(isOnline) => (
        <TypedSearchProductsQuery
          // @ts-ignore
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {({ loading, data, loadMore }) => {
            const canDisplayFilters =
              !!data?.attributes?.edges && !!data?.products?.edges;

            if (canDisplayFilters) {
              const handleLoadMore = () =>
                loadMore(
                  (prev, next) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      edges: [...prev.products.edges, ...next.products.edges],
                      pageInfo: next.products.pageInfo,
                    },
                  }),
                  { after: data.products.pageInfo.endCursor }
                );

              return (
                <>
                  <Page
                    clearFilters={clearFilters}
                    attributes={data.attributes.edges.map((edge) => edge.node)}
                    displayLoader={loading}
                    hasNextPage={maybe(
                      () => data.products.pageInfo.hasNextPage,
                      false
                    )}
                    sortOptions={sortOptions}
                    setSearch={setSearch}
                    search={search}
                    activeSortOption={filters.sortBy}
                    filters={filters}
                    products={data.products}
                    onAttributeFiltersChange={onFiltersChange}
                    onLoadMore={handleLoadMore}
                    activeFilters={
                      filters!.attributes
                        ? Object.keys(filters!.attributes).length
                        : 0
                    }
                    onOrder={(value) => {
                      setSort(value.value);
                    }}
                  />
                </>
              );
            }

            if (data && data.products === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedSearchProductsQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
