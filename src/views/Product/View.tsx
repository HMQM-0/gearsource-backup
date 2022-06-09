import "./scss/index.scss";

// import { useCart } from "@nautical/sdk";
import { useAuth, useCart } from "@nautical/react";
import { isEmpty } from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
// import { RouteComponentProps, useLocation } from "react-router";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Loader } from "@components/atoms";
import { Box } from "@mui/material";
import {
  MetaWrapper,
  NotFound,
  OfflinePlaceholder,
  OverlayContext,
  // OverlayTheme,
  // OverlayType,
} from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { getGraphqlIdFromDBId, isMicrosite, maybe } from "../../core/utils";
import {
  ProductDetails_product,
  ProductDetails_product_variants,
} from "./gqlTypes/ProductDetails";
import Page from "./Page";
import {
  TypedBuilderProductDetailsQuery,
  TypedProductDetailsQuery,
} from "./queries";
import { IProps } from "./types";
import { TypedMicrositeQuery } from "../Microsites/queries";
import { ShopContext } from "@temp/components/ShopProvider/context";
// import ReactSVG from "react-svg";
// import logoImg from "../../images/logo.svg";
import StorePage from "../Builder/StorePage";
import {
  useProductVariantsAttributes,
  useProductVariantsAttributesValuesSelection,
} from "@hooks";
import { IProductVariantsAttributesSelectedValues } from "@types";
import {
  canAddToCart,
  getAvailableQuantity,
} from "@components/organisms/AddToCartSection/stockHelpers";
import { BuilderProductDetails_product } from "./gqlTypes/BuilderProductDetails";

const canDisplay = (
  product: ProductDetails_product | BuilderProductDetails_product
) =>
  maybe(
    () =>
      !!product.descriptionJson &&
      !!product.name &&
      !!product.pricing &&
      !!product.variants
  );
const extractMeta = (
  product: ProductDetails_product | BuilderProductDetails_product
) => ({
  custom: [
    {
      content: product.pricing?.priceRange?.start?.gross.amount.toString(),
      property: "product:price:amount",
    },
    {
      content: product.pricing?.priceRange?.start?.gross.currency,
      property: "product:price:currency",
    },
    {
      content: product.isAvailable ? "in stock" : "out off stock",
      property: "product:isAvailable",
    },
    {
      content: product.category?.name,
      property: "product:category",
    },
  ],
  description: product.seoDescription || product.descriptionJson,
  image: product?.thumbnail?.url || null,
  title: product.seoTitle || product.name,
  type: "product.item",
  url: window.location.href,
});

const PageWithQueryAttributes: React.FC<IProps> = (props) => {
  const { product, microsite } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const { user } = useAuth();

  const searchQueryAttributes = queryString.parse(search);
  const { builderKey, loginForPrice } = React.useContext(ShopContext);

  const onAttributeChangeHandler = (slug: string | null, value: string) => {
    navigate(
      queryString.stringifyUrl(
        {
          query: { [slug]: value },
          url: `${location.pathname}${location.search}`,
        },
        { skipEmptyString: true }
      )
    );
  };
  const [queryAttributes, setQueryAttributes] = useState({});

  useEffect(() => {
    if (!isEmpty(searchQueryAttributes)) {
      const queryAttributes: Record<string, string> = {};
      product.variants.forEach(({ attributes }) => {
        attributes.forEach(({ attribute, values }) => {
          const selectedAttributeValue = searchQueryAttributes[attribute.slug];
          if (
            selectedAttributeValue &&
            values[0].value === selectedAttributeValue
          ) {
            if (
              isEmpty(queryAttributes) ||
              !attributes.filter(
                ({ attribute: { id }, values }) =>
                  queryAttributes[id] && queryAttributes[id] !== values[0].value
              ).length
            ) {
              queryAttributes[attribute?.id] = selectedAttributeValue;
            }
          }
        });
      });
      setQueryAttributes(queryAttributes);
    } else {
      const queryAttributes: Record<string, string> = {};
      product.defaultVariant?.attributes?.forEach(({ attribute, values }) => {
        const selectedAttributeValue =
          values.length > 0
            ? product.defaultVariant?.attributes?.find(
                (obj) => obj.attribute.slug === attribute.slug
              ).values[0].value
            : null;
        if (
          selectedAttributeValue &&
          values[0].value === selectedAttributeValue
        ) {
          if (
            isEmpty(queryAttributes) ||
            !product.defaultVariant?.attributes?.filter(
              ({ attribute: { id }, values }) =>
                queryAttributes[id] && queryAttributes[id] !== values[0].value
            ).length
          ) {
            queryAttributes[attribute?.id] = selectedAttributeValue;
          }
        }
      });
      setQueryAttributes(queryAttributes);
    }
  }, [product.variants.length, product.defaultVariant]);

  useEffect(() => {
    navigate(location.pathname, { replace: true });
  }, [queryAttributes]);

  const productVariantAttributes = useProductVariantsAttributes(
    product.variants
  );

  const [selectedVariant, setSelectedVariant] = React.useState(
    product.defaultVariant
  );

  const [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ] = useProductVariantsAttributesValuesSelection(productVariantAttributes);

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ): undefined => {
    // if (!selectedVariant) {
    //   setVariantId("");
    //   setVariantPricing(null);
    //   setVariantStock(0);
    //   return;
    // }
    // setVariantId(selectedVariant.id);
    // setVariantPricing(selectedVariant?.pricing);
    // setVariantStock(selectedVariant?.quantityAvailable);
    if (!selectedVariant) {
      setSelectedVariant(null);
      return;
    } else {
      setSelectedVariant(selectedVariant);
    }
  };

  const onAttributeChange = (id: string, value: any, slug: string | null) => {
    selectProductVariantsAttributesValue(id, value);
    onAttributeChangeHandler(slug, value);
  };

  useEffect(() => {
    const chosenVariant = product?.variants?.find((productVariant) => {
      return productVariant.attributes.every((productVariantAttribute) => {
        const productVariantAttributeId = productVariantAttribute.attribute.id;
        if (
          productVariantAttribute.values[0] &&
          productVariantsAttributesSelectedValues[productVariantAttributeId] &&
          productVariantAttribute.values[0]!.id ===
            productVariantsAttributesSelectedValues[productVariantAttributeId]!
              .id
        ) {
          return true;
        }
        return false;
      });
    });

    onVariantPickerChange(
      productVariantsAttributesSelectedValues,
      chosenVariant
    );
  }, [productVariantsAttributesSelectedValues]);

  useEffect(() => {
    if (product.defaultVariant) {
      product.defaultVariant?.attributes?.map((variantAttribute) => {
        const attributeId = variantAttribute?.attribute?.id;
        const attributeValueId = variantAttribute?.values[0]?.id;
        onAttributeChange(attributeId, attributeValueId, null);
      });
    } else {
      product.variants.length > 0 &&
        product.variants[0].attributes?.map((variantAttribute) => {
          const attributeId = variantAttribute?.attribute?.id;
          const attributeValueId = variantAttribute?.values[0]?.id;
          onAttributeChange(attributeId, attributeValueId, null);
        });
    }
  }, [product]);

  const { items } = useCart();

  // const [variantId, setVariantId] = React.useState(product.defaultVariant?.id);
  // const [variantStock, setVariantStock] = useState<number>(0);
  // const variantStock = selectedVariant.quantityAvailable;
  // @ts-ignore
  const [quantity, setQuantity] = useState<number>(1);

  const availableQuantity = getAvailableQuantity(
    items,
    selectedVariant?.id,
    selectedVariant?.quantityAvailable
  );
  const isOutOfStock =
    !!selectedVariant?.id && selectedVariant?.quantityAvailable === 0;
  const noPurchaseAvailable =
    !product.isAvailableForPurchase && !product.availableForPurchase;
  const purchaseAvailableDate =
    !product.isAvailableForPurchase &&
    product.availableForPurchase &&
    Date.parse(product.availableForPurchase);
  const isNoItemsAvailable =
    !!selectedVariant?.id && !isOutOfStock && !availableQuantity;
  const isLowStock =
    !!selectedVariant?.id &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < 5;

  const disableButton =
    !canAddToCart(
      items,
      !!product.isAvailableForPurchase,
      selectedVariant?.id,
      selectedVariant?.quantityAvailable,
      quantity
    ) ||
    (!user && loginForPrice);

  return (
    <>
      {builderKey ? (
        <StorePage
          product={{
            ...product,
            productVariantAttributes: Object.values(productVariantAttributes),
            productVariantsAttributesSelectedValues: Object.values(
              productVariantsAttributesSelectedValues
            ),
            selectedVariant: selectedVariant,
            disableButton: disableButton,
            outOfStock: isOutOfStock,
            noPurchaseAvailable: noPurchaseAvailable,
            purchaseAvailableDate: purchaseAvailableDate,
            noItemsAvailable: isNoItemsAvailable,
            lowStock: isLowStock,
            selectedImage: product.thumbnail2x?.url,
          }}
          variantSelect={onAttributeChange}
        />
      ) : (
        <Page
          {...props}
          microsite={microsite}
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
        />
      )}
    </>
  );
};

// const View: React.FC<RouteComponentProps<{ id: string; micrositeId: string }>> =
const View: React.FC<any> = ({ logo }) => {
  const { addItem, items } = useCart();
  const params = useParams();

  const { user } = useAuth();

  const { builderKey, loginForProducts } = React.useContext(ShopContext);

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
  ) : !!isMicrosite() ? (
    <TypedMicrositeQuery
      variables={{
        id: getGraphqlIdFromDBId(params.micrositeId, "Microsite"),
      }}
    >
      {({
        data: micrositeData,
        loading: micrositeLoading,
        error: micrositeError,
      }) => {
        if (micrositeLoading) {
          return <Loader />;
        }

        if (micrositeData?.microsite === null) {
          return <NotFound />;
        }

        if (micrositeData?.microsite && !micrositeLoading && !micrositeError) {
          return (
            <TypedProductDetailsQuery
              loaderFull
              variables={{
                id: getGraphqlIdFromDBId(params?.id, "Product"),
              }}
              errorPolicy="all"
              key={params?.id}
            >
              {({ data, loading }) => (
                // @ts-ignore
                <NetworkStatus>
                  {(isOnline) => {
                    const { product } = data;
                    if (canDisplay(product)) {
                      return (
                        <MetaWrapper meta={extractMeta(product)}>
                          <PageWithQueryAttributes
                            microsite={micrositeData.microsite}
                            product={product}
                            add={addItem}
                            items={items}
                          />
                        </MetaWrapper>
                      );
                    }

                    if (loading) {
                      return <Loader />;
                    }

                    if (product === null) {
                      return <NotFound />;
                    }

                    if (!isOnline) {
                      return <OfflinePlaceholder />;
                    }
                  }}
                </NetworkStatus>
              )}
            </TypedProductDetailsQuery>
          );
        }
      }}
    </TypedMicrositeQuery>
  ) : builderKey ? (
    <TypedBuilderProductDetailsQuery
      loaderFull
      variables={{
        id: getGraphqlIdFromDBId(params.id, "Product"),
        // slug: params.slug,
      }}
      errorPolicy="all"
      key={params.id}
    >
      {({ data, loading }) => (
        // @ts-ignore
        <NetworkStatus>
          {(isOnline) => {
            const { product } = data;
            if (canDisplay(product)) {
              return (
                <MetaWrapper meta={extractMeta(product)}>
                  <PageWithQueryAttributes
                    microsite={null}
                    product={product}
                    add={addItem}
                    items={items}
                  />
                </MetaWrapper>
              );
            }

            if (loading) {
              return <Loader />;
            }

            if (product === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </NetworkStatus>
      )}
    </TypedBuilderProductDetailsQuery>
  ) : (
    <TypedProductDetailsQuery
      loaderFull
      variables={{
        id: getGraphqlIdFromDBId(params?.id, "Product"),
      }}
      errorPolicy="all"
      key={params?.id}
    >
      {({ data, loading }) => (
        // @ts-ignore
        <NetworkStatus>
          {(isOnline) => {
            const { product } = data;
            if (canDisplay(product)) {
              return (
                <MetaWrapper meta={extractMeta(product)}>
                  <PageWithQueryAttributes
                    microsite={null}
                    product={product}
                    add={addItem}
                    items={items}
                  />
                </MetaWrapper>
              );
            }

            if (loading) {
              return <Loader />;
            }

            if (product === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </NetworkStatus>
      )}
    </TypedProductDetailsQuery>
  );
};

export default View;
