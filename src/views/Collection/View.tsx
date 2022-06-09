import { xLargeScreen } from "@styles/constants";
import * as React from "react";
import Media from "react-media";
// import { RouteComponentProps } from "react-router";
import "./scss/index.scss";
import { Box } from "@mui/material";
// import { Grid } from "@mui/material";
// import { ProductSideNavbarList } from "@temp/_nautical/components/ProductSideNavbar/ProductSideNavbarList";
import { ProductSideNavbarGrid } from "@temp/_nautical/components/ProductSideNavbarGrid/ProductSideNavbarGrid";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { Loader } from "@components/atoms";
import {
  MetaWrapper,
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
} from "../../core/utils";
import Page from "./Page";
import {
  TypedBuilderCollectionProductsDataQuery,
  TypedBuilderCollectionProductsQuery,
  // builderCollectionInfoQuery,
  // builderCollectionQuery,
  TypedCollectionProductsDataQuery,
  TypedCollectionProductsQuery,
} from "./queries";
import { useIntl } from "react-intl";
import { prodListHeaderCommonMsg } from "@temp/intl";
import { useAuth } from "@nautical/react";
// import ReactSVG from "react-svg";
// import logoImg from "../../images/logo.svg";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { useParams } from "react-router";
import StorePage from "../Builder/StorePage";
// import { useQuery } from "@apollo/client";

// type ViewProps = RouteComponentProps<{
//   id: string;
// }>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(`${value}_${valueObj[value].join("_")}`);
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
  const intl = useIntl();

  const { user } = useAuth();

  const { loginForProducts, builderKey } = React.useContext(ShopContext);

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
    after: afterFilters,
    before: beforeFilters,
    first: !lastFilters && !firstFilters ? PRODUCTS_PER_PAGE : firstFilters,
    last: lastFilters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(params.id, "Collection"),
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
      {(isOnline) => (
        <TypedBuilderCollectionProductsDataQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {(collectionData) => {
            if (collectionData.loading) {
              return <Loader />;
            }

            if (
              collectionData.data &&
              collectionData.data.collection === null
            ) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!collectionData.data?.attributeList?.attributes &&
              !!collectionData.data?.collection?.name;

            return (
              <TypedBuilderCollectionProductsQuery
                // @ts-ignore
                variables={variables}
              >
                {(collectionProductsData) => {
                  if (!canDisplayFilters && collectionProductsData.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    // const handleLoadMore = () =>
                    //   collectionProductsData.loadMore(
                    //     (prev, next) => ({
                    //       collection: {
                    //         ...prev.collection,
                    //         productList: {
                    //           ...prev.collection.productList,
                    //           products: [
                    //             ...prev.collection.productList.products,
                    //             ...next.collection.productList.products,
                    //           ],
                    //           pageInfo: next.collection.productList.pageInfo,
                    //         },
                    //       },
                    //     }),
                    //     {
                    //       after:
                    //         collectionProductsData.data.collection.productList
                    //           .pageInfo.endCursor,
                    //     }
                    //   );

                    const loadNextPage = () => {
                      setBeforeFilters(null);
                      setLastFilters(null);
                      setAfterFilters(
                        collectionProductsData.data.collection.productList
                          .pageInfo.endCursor
                      );
                      setFirstFilters(PRODUCTS_PER_PAGE);
                    };

                    const loadPrevPage = () => {
                      setAfterFilters(null);
                      setFirstFilters(null);
                      setBeforeFilters(
                        collectionProductsData.data.collection.productList
                          .pageInfo.startCursor
                      );
                      setLastFilters(PRODUCTS_PER_PAGE);
                    };

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                            collectionData.data.collection.seoDescription,
                          title: collectionData.data.collection.seoTitle,
                          type: "product.collection",
                        }}
                      >
                        <StorePage
                          collection={{
                            ...collectionData.data,
                            ...collectionProductsData.data,
                          }}
                          loadNextPage={loadNextPage}
                          loadPrevPage={loadPrevPage}
                        />
                      </MetaWrapper>
                    );
                  }

                  return null;
                }}
              </TypedBuilderCollectionProductsQuery>
            );
          }}
        </TypedBuilderCollectionProductsDataQuery>
      )}
    </NetworkStatus>
  ) : (
    <NetworkStatus>
      {(isOnline) => (
        <TypedCollectionProductsDataQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {(collectionData) => {
            if (collectionData.loading) {
              return <Loader />;
            }

            if (
              collectionData.data &&
              collectionData.data.collection === null
            ) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!collectionData.data?.attributes?.edges &&
              !!collectionData.data?.collection?.name;

            return (
              <TypedCollectionProductsQuery
                // @ts-ignore
                variables={variables}
                fetchPolicy="cache-first"
              >
                {(collectionProductsData) => {
                  if (!canDisplayFilters && collectionProductsData.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    const handleLoadMore = () =>
                      collectionProductsData.loadMore(
                        (prev, next) => ({
                          collection: {
                            ...prev.collection,
                            products: {
                              ...prev.collection.products,
                              edges: [
                                ...prev.collection.products.edges,
                                ...next.collection.products.edges,
                              ],
                              pageInfo: next.collection.products.pageInfo,
                            },
                          },
                        }),
                        {
                          after:
                            collectionProductsData.data.collection.products
                              .pageInfo.endCursor,
                        }
                      );

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                            collectionData.data.collection.seoDescription,
                          title: collectionData.data.collection.seoTitle,
                          type: "product.collection",
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
                                <ProductSideNavbarGrid
                                  matches={matches}
                                  menu={collectionData.data.menu}
                                >
                                  <Page
                                    clearFilters={clearFilters}
                                    attributes={collectionData.data.attributes.edges.map(
                                      (edge) => edge.node
                                    )}
                                    menu={collectionData.data.menu}
                                    collection={collectionData.data.collection}
                                    displayLoader={collectionData.loading}
                                    hasNextPage={
                                      collectionProductsData.data?.collection
                                        ?.products?.pageInfo?.hasNextPage
                                    }
                                    sortOptions={sortOptions}
                                    activeSortOption={filters.sortBy}
                                    filters={filters}
                                    products={
                                      collectionProductsData?.data?.collection
                                        ?.products
                                    }
                                    onAttributeFiltersChange={onFiltersChange}
                                    onLoadMore={handleLoadMore}
                                    activeFilters={
                                      filters!.attributes
                                        ? Object.keys(filters!.attributes)
                                            .length
                                        : 0
                                    }
                                    onOrder={(value) => {
                                      setSort(value.value);
                                    }}
                                  />
                                </ProductSideNavbarGrid>
                              </>
                            );
                          }}
                        </Media>
                      </MetaWrapper>
                    );
                  }

                  return null;
                }}
              </TypedCollectionProductsQuery>
            );
          }}
        </TypedCollectionProductsDataQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
