import { xLargeScreen } from "@styles/constants";
import React from "react";
import Media from "react-media";
import { Box } from "@mui/material";
// import { RouteComponentProps } from "react-router";

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
  TypedCategoryProductsQuery,
  TypedCategoryProductsDataQuery,
  TypedBuilderCategoryQuery,
  TypedBuilderCategoryProductsQuery,
  // builderCategoryQuery,
  // builderCategoryDataQuery,
} from "./queries";
import { prodListHeaderCommonMsg } from "@temp/intl";
import { useIntl } from "react-intl";
import { useAuth } from "@nautical/react";
import { ShopContext } from "@temp/components/ShopProvider/context";
// import ReactSVG from "react-svg";
// import logoImg from "../../images/logo.svg";
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
  //console.info("CATEGORY VIEW")
  // console.info(match)
  const params = useParams();
  // console.info(params)
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

  const [afterFilters, setAfterFilters] = useQueryParam("after");
  const [beforeFilters, setBeforeFilters] = useQueryParam("before");
  const [firstFilters, setFirstFilters] = useQueryParam("first");
  const [lastFilters, setLastFilters] = useQueryParam("last");

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

  // const { data: builderCategoryData } = useQuery(builderCategoryQuery, {
  //   variables: variables
  // });

  // const { data: builderCategoryInfoData } = useQuery(builderCategoryDataQuery, {
  //   variables: variables
  // });

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
        <TypedBuilderCategoryQuery variables={variables}>
          {(builderCategoryData) => {
            if (builderCategoryData.loading) {
              return <Loader />;
            }

            if (
              builderCategoryData.data &&
              builderCategoryData.data.category === null
            ) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!builderCategoryData.data?.attributeList?.attributes &&
              !!builderCategoryData.data?.category?.name;

            return (
              <TypedBuilderCategoryProductsQuery
                // @ts-ignore
                variables={variables}
              >
                {(builderCategoryProducts) => {
                  if (!canDisplayFilters && builderCategoryProducts.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    // const handleLoadMore = () =>
                    //   builderCategoryProducts.loadMore(
                    //     (prev, next) => ({
                    //       ...prev,
                    //       productList: {
                    //         ...prev.productList,
                    //         products: [
                    //           ...prev.productList.products,
                    //           ...next.productList.products,
                    //         ],
                    //         pageInfo: next.productList.pageInfo,
                    //       },
                    //     }),
                    //     {
                    //       after:
                    //         builderCategoryProducts.data.productList.pageInfo.endCursor,
                    //     }
                    //   );
                    const loadNextPage = () => {
                      setBeforeFilters(null);
                      setLastFilters(null);
                      setAfterFilters(
                        builderCategoryProducts.data.productList.pageInfo
                          .endCursor
                      );
                      setFirstFilters(PRODUCTS_PER_PAGE);
                    };

                    const loadPrevPage = () => {
                      setAfterFilters(null);
                      setFirstFilters(null);
                      setBeforeFilters(
                        builderCategoryProducts.data.productList.pageInfo
                          .startCursor
                      );
                      setLastFilters(PRODUCTS_PER_PAGE);
                    };

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                            builderCategoryData.data.category.seoDescription,
                          title: builderCategoryData.data.category.seoTitle,
                          type: "product.category",
                        }}
                      >
                        <Box style={{ textAlign: "center" }}>
                          <StorePage
                            category={{
                              ...builderCategoryData.data,
                              ...builderCategoryProducts.data,
                            }}
                            loadNextPage={loadNextPage}
                            loadPrevPage={loadPrevPage}
                          />
                          {/* {builderCategoryData.data && builderCategoryProducts.data.productList?.pageInfo?.hasNextPage &&
                          <Box style={{ marginBottom: "20px", marginLeft: "auto", marginRight: "auto" }}>
                            <Button
                              variant="contained"
                              // testingContext="loadMoreProductsButton"
                              color="secondary"
                              onClick={handleLoadMore}
                              // ref={moreButton}
                            >
                              <FormattedMessage defaultMessage="More +" />
                            </Button>
                          </Box>} */}
                        </Box>
                      </MetaWrapper>
                    );
                  }

                  return null;
                }}
              </TypedBuilderCategoryProductsQuery>
            );
          }}
        </TypedBuilderCategoryQuery>
      )}
    </NetworkStatus>
  ) : (
    <NetworkStatus>
      {(isOnline) => (
        <TypedCategoryProductsDataQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {(categoryData) => {
            if (categoryData.loading) {
              return <Loader />;
            }

            if (categoryData.data && categoryData.data.category === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            const canDisplayFilters =
              !!categoryData.data?.attributes?.edges &&
              !!categoryData.data?.category?.name;

            return (
              <TypedCategoryProductsQuery
                // @ts-ignore
                variables={variables}
                fetchPolicy="cache-first"
              >
                {(categoryProducts) => {
                  if (!canDisplayFilters && categoryProducts.loading) {
                    return <Loader />;
                  }

                  if (canDisplayFilters) {
                    const handleLoadMore = () =>
                      categoryProducts.loadMore(
                        (prev, next) => ({
                          ...prev,
                          products: {
                            ...prev.products,
                            edges: [
                              ...prev.products.edges,
                              ...next.products.edges,
                            ],
                            pageInfo: next.products.pageInfo,
                          },
                        }),
                        {
                          after:
                            categoryProducts.data.products.pageInfo.endCursor,
                        }
                      );

                    return (
                      <MetaWrapper
                        meta={{
                          description:
                            categoryData.data.category.seoDescription,
                          title: categoryData.data.category.seoTitle,
                          type: "product.category",
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
                                  menu={categoryData.data.menu}
                                >
                                  <Page
                                    clearFilters={clearFilters}
                                    attributes={categoryData.data.attributes.edges.map(
                                      (edge) => edge.node
                                    )}
                                    menu={categoryData.data.menu}
                                    category={categoryData.data.category}
                                    displayLoader={categoryData.loading}
                                    hasNextPage={
                                      categoryProducts.data?.products?.pageInfo
                                        ?.hasNextPage
                                    }
                                    sortOptions={sortOptions}
                                    activeSortOption={filters.sortBy}
                                    filters={filters}
                                    products={categoryProducts.data.products}
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
              </TypedCategoryProductsQuery>
            );
          }}
        </TypedCategoryProductsDataQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
