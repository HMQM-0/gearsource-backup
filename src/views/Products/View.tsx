import * as React from "react";
import Media from "react-media";
// import { RouteComponentProps } from "react-router";
import { Box } from "@mui/material";
// import { Grid } from "@mui/material";
import { xLargeScreen } from "@styles/constants";
// import { ProductSideNavbarList } from "@temp/_nautical/components/ProductSideNavbar/ProductSideNavbarList";
// import { ProductSideNavbarGrid } from "@temp/_nautical/components/ProductSideNavbarGrid/ProductSideNavbarGrid";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";
import Page from "./Page";
import { builderProductsQuery, TypedProductsQuery } from "./queries";
// import { TypedBuilderProductsQuery, TypedProductsQuery } from "./queries";

import { OverlayContext } from "../../components";
import { useAuth } from "@nautical/react";
// import ReactSVG from "react-svg";
// import logoImg from "../../images/logo.svg";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { useParams } from "react-router";
import StorePage from "../Builder/StorePage";
// import { useVisibility } from "@temp/_nautical/hooks";
// import { FormattedMessage } from "react-intl";
import { useQuery } from "@apollo/client";
import {
  BuilderProducts,
  BuilderProductsVariables,
} from "./gqlTypes/BuilderProducts";
import { Loader } from "@components/atoms";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue?.split(".").filter((n) => n);
    propsWithValues?.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const PaginationQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue?.split(".").filter((n) => n);
    propsWithValues?.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

// export const View: React.FC<ViewProps> = ({ match }) => {
export const View: React.FC<any> = ({ logo }) => {
  const params = useParams();
  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const [afterFilters, setAfterFilters] = useQueryParam("after");
  const [beforeFilters, setBeforeFilters] = useQueryParam("before");
  const [firstFilters, setFirstFilters] = useQueryParam("first");
  const [lastFilters, setLastFilters] = useQueryParam("last");

  // React.useEffect(() => {
  //   if (!firstFilters && !lastFilters) {
  //     setFirstFilters(PRODUCTS_PER_PAGE)
  //   }
  // }, [])

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const { user } = useAuth();

  const { loginForProducts, builderKey } = React.useContext(ShopContext);

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

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
  };
  const variables = {
    ...filters,
    after: afterFilters,
    before: beforeFilters,
    first: !lastFilters && !firstFilters ? PRODUCTS_PER_PAGE : firstFilters,
    last: lastFilters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(params.id, "Category"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  const sortOptions = [
    {
      label: "Clear...",
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
      label: "Price Low-High",
      value: "price",
    },
    {
      label: "Price High-Low",
      value: "-price",
    },
    {
      label: "Name Increasing",
      value: "name",
    },
    {
      label: "Name Decreasing",
      value: "-name",
    },
    {
      label: "Last updated Ascending",
      value: "updated_at",
    },
    {
      label: "Last updated Descending",
      value: "-updated_at",
    },
  ];
  // @ts-ignore
  const { data: builderProductsData, loading: builderProductsLoading } =
    useQuery<BuilderProducts, BuilderProductsVariables>(builderProductsQuery, {
      // @ts-ignore
      variables: variables,
    });

  const loadNextPage = () => {
    setBeforeFilters(null);
    setLastFilters(null);
    setAfterFilters(builderProductsData.productList.pageInfo.endCursor);
    setFirstFilters(PRODUCTS_PER_PAGE);
  };

  const loadPrevPage = () => {
    setAfterFilters(null);
    setFirstFilters(null);
    setBeforeFilters(builderProductsData.productList.pageInfo.startCursor);
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
  ) : builderKey ? (
    <NetworkStatus>
      {(isOnline) => {
        if (builderProductsLoading) {
          return <Loader />;
        }

        const canDisplayFilters = maybe(
          () => !!builderProductsData.attributes.edges,
          false
        );

        if (canDisplayFilters) {
          return (
            <MetaWrapper
              meta={{
                description: "All Products",
                title: "All Products",
                type: "product.products",
              }}
            >
              <StorePage
                products={builderProductsData}
                // @ts-ignore
                loadNextPage={loadNextPage}
                loadPrevPage={loadPrevPage}
              />
            </MetaWrapper>
          );
        }

        if (builderProductsData === null) {
          return <NotFound />;
        }

        if (!isOnline) {
          return <OfflinePlaceholder />;
        }

        return <Loader />;
      }}
    </NetworkStatus>
  ) : (
    <NetworkStatus>
      {(isOnline) => (
        // @ts-ignore
        <TypedProductsQuery
          // @ts-ignore
          variables={variables}
          errorPolicy="all"
          displayLoader={false}
          alwaysRender
        >
          {({ loading, data, error, loadMore, previousData }) => {
            const canDisplayFilters = maybe(
              () => !!data.attributes.edges,
              false
            );

            // Attributes are not often changed,
            // so using previous data values as a fallback, to still show attributes during `loading` state
            const attributes =
              (data || previousData)?.attributes.edges.map(
                (edge) => edge.node
              ) ?? [];

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

            // const moreButton = useVisibility(
            //   (visible) => {
            //     if (!loading) {
            //       if (visible && maybe(
            //         () => data.products.pageInfo.hasNextPage,
            //         false
            //       )) {
            //         // handleLoadMore();
            //         setTimeout(() => {
            //           handleLoadMore();
            //         }, 500);
            //       }
            //     }
            //   },
            //   [loading]
            // );

            if (canDisplayFilters || loading) {
              return (
                <MetaWrapper
                  meta={{
                    description: "All Products",
                    title: "All Products",
                    type: "product.products",
                  }}
                >
                  <Media
                    query={{
                      minWidth: xLargeScreen,
                    }}
                  >
                    {(matches: boolean) => {
                      return (
                        <>
                          {/* <ProductSideNavbarGrid
                          matches={matches}
                          menu={data.menu}
                        > */}
                          <Page
                            clearFilters={clearFilters}
                            attributes={attributes}
                            menu={data?.menu}
                            displayLoader={loading}
                            hasNextPage={maybe(
                              () => data.products.pageInfo.hasNextPage,
                              false
                            )}
                            sortOptions={sortOptions}
                            activeSortOption={filters.sortBy}
                            filters={filters}
                            products={data?.products}
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
                          {/* </ProductSideNavbarGrid> */}
                        </>
                      );
                    }}
                  </Media>
                </MetaWrapper>
              );
            }

            if (data === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedProductsQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
