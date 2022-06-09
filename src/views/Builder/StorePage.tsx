import "./mui";
import "./nautical";
import "@builder.io/widgets";
import * as React from "react";
// import appState from '@builder.io/app-context';
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { CircularProgress, useTheme } from "@mui/material";
import { maybe } from "@utils/misc";
import {
  useAddWishlistProduct,
  useAuth,
  useCart,
  useRemoveWishlistProduct,
} from "@nautical/react";
import { useAlert } from "react-alert";
import { StringParam, useQueryParam, useQueryParams } from "use-query-params";
import { useNavigate } from "react-router";
import { Base64 } from "js-base64";
// import { slugify } from "@utils/core";
import queryString from "query-string";
import { micrositesQuery } from "./queries";
import { useQuery } from "@apollo/client";
import { useIntl } from "react-intl";
import { userWishlist } from "@temp/@nautical/queries/wishlist";
import { WishlistContext } from "@nautical/react/components/WishlistProvider/context";
import { FilterQuerySet } from "../Products/View";
// import { useProductVariantsAttributes, useProductVariantsAttributesValuesSelection } from "@hooks";

const model = "store";
var type = "/store/product";
interface IStorePage {
  category?: any;
  collection?: any;
  product?: any;
  landing?: any;
  products?: any;
  loadMore?: any;
  loadNextPage?: any;
  loadPrevPage?: any;
  search?: any;
  wishlist?: any;
  microsite?: any;
  vendors?: boolean;
  variantSelect?: any;
}

const NoComponent: React.FunctionComponent = (props) => {
  return <>404</>;
};

const StorePage: React.FunctionComponent<IStorePage> = (props) => {
  const {
    category,
    collection,
    product,
    landing,
    products,
    loadMore,
    loadNextPage,
    loadPrevPage,
    search,
    wishlist,
    microsite,
    vendors,
    variantSelect,
  } = props;
  // @ts-ignore
  const [searchParams, setSearchParams] = useQueryParams({
    q: StringParam,
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pageJson, setPage] = React.useState();
  const [isLoading, setLoading] = React.useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;
  const { addItem, items } = useCart();
  const theme = useTheme();
  const alert = useAlert();
  const intl = useIntl();

  // @ts-ignore
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const { wishlist: wishlistContext } = React.useContext(WishlistContext);

  const [micrositesVariables, setMicrositesVariables] = React.useState({
    first: 100,
    search: null,
  });

  const { data: builderMicrositesData } = useQuery(micrositesQuery, {
    fetchPolicy: "cache-and-network",
    variables: micrositesVariables,
  });

  function handleAddToCart(name: string, variantId: string, quantity: number) {
    addItem(variantId, quantity);
    alert.show(
      {
        title: "Added " + quantity + "x " + name,
      },
      { type: "success" }
    );
  }

  function handleSetSearch(query: string) {
    setSearchParams({
      q: query,
    });
  }

  function sanitizeModel(model: any) {
    if (model === null || model === undefined) {
      return null;
    } else {
      return JSON.parse(JSON.stringify(model));
    }
  }

  function handleNavigateById(id: string, slug: string) {
    const rawId = Base64.decode(id).split(":");
    let schema = rawId[0];
    const primaryKey = rawId[1];
    if (schema.toLowerCase() === "microsite") {
      schema = "site";
    }
    navigate("/" + schema.toLowerCase() + "/" + slug + "/" + primaryKey);
  }

  function handleNavigateByItem(item) {
    const rawId = Base64.decode(item.id).split(":");
    let schema = rawId[0];
    const primaryKey = rawId[1];
    // const slug = slugify(item.name);
    const slug = item.slug;
    // if (schema.toLowerCase() === "microsite") {
    //   schema = "site";
    // }
    switch (schema.toLowerCase()) {
      case "microsite":
        schema = "site";
        break;
      // case "product":
      //   schema = "produit"
    }
    navigate("/" + schema.toLowerCase() + "/" + slug + "/" + primaryKey + "/");
  }

  // const productVariantAttributes = useProductVariantsAttributes(product?.variants || []);

  // const [productVariantsAttributesSelectedValues, selectProductVariantsAttributesValue] = useProductVariantsAttributesValuesSelection(productVariantAttributes);

  function handleGetItemUrl(item) {
    const rawId = Base64.decode(item.id).split(":");
    let schema = rawId[0];
    const primaryKey = rawId[1];
    const slug = item.slug;

    switch (schema.toLowerCase()) {
      case "microsite":
        schema = "site";
        break;
      // case "product":
      //   schema = "produit"
    }

    return "/" + schema.toLowerCase() + "/" + slug + "/" + primaryKey + "/";
  }

  // @ts-ignore
  const [selectedVariant, setSelectedVariant] = React.useState(
    product?.defaultVariant
  );

  // function getSelectedVariant() {
  //   // attributeSelections
  //   // [{
  //   //   id: attributeId,
  //   //   value: attributeValueId
  //   // }, ...]
  //   const selectedVariant = product.variants.find((productVariant) => {
  //     return productVariant.attributes.every((productVariantAttribute) => {
  //       const productVariantAttributeId = productVariantAttribute.attribute.id;
  //       if (
  //         productVariantAttribute.values[0] &&
  //         productVariantsAttributesSelectedValues[productVariantAttributeId] &&
  //         productVariantAttribute.values[0]!.id ===
  //           productVariantsAttributesSelectedValues[productVariantAttributeId]!
  //             .id
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   });
  //   return selectedVariant;
  // }

  // React.useEffect(() => {
  //   console.info("USE EFFECT START")
  //   const newVariant = product?.variants?.find((productVariant) => {
  //     return productVariant.attributes.every((productVariantAttribute) => {
  //       const productVariantAttributeId = productVariantAttribute.attribute.id;
  //       if (
  //         productVariantAttribute.values[0] &&
  //         productVariantsAttributesSelectedValues[productVariantAttributeId] &&
  //         productVariantAttribute.values[0]!.id ===
  //           productVariantsAttributesSelectedValues[productVariantAttributeId]!
  //             .id
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   });
  //   console.info("USE EFFECT END")
  //   console.info(newVariant)
  //   setSelectedVariant(newVariant);
  //   // if (onChange) {
  //   //   onChange(productVariantsAttributesSelectedValues, selectedVariant);
  //   // }
  // }, [productVariantsAttributesSelectedValues]);

  // @ts-ignore
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

  const [setRemoveWishlistProduct] = useRemoveWishlistProduct();
  const [setAddWishlistProduct] = useAddWishlistProduct();

  const isAddedToWishlist = async (productId: string) => {
    // console.info("WISHLIST")
    // console.info(wishlistContext)
    // console.info(productId)
    // console.info(wishlistContext.some(({ product }) => product.id === productId))
    // console.info(!!wishlistContext && wishlistContext.some(({ product }) => product.id === productId))
    return (
      !!wishlistContext &&
      wishlistContext.some(({ product }) => product.id === productId)
    );
  };

  const addOrRemoveFromWishlist = async (productId: string) => {
    const addedToWishlist =
      !!wishlistContext &&
      wishlistContext.some(({ product }) => product.id === productId);

    if (!user) {
      alert.show(
        {
          content: `Please log in to add the product to your wishlist`,
          title: intl.formatMessage({
            defaultMessage: "Login required",
          }),
        },
        {
          timeout: 7500,
          type: "error",
        }
      );
    }
    if (addedToWishlist && user) {
      await setRemoveWishlistProduct(
        { productId },
        {
          refetchQueries: [
            userWishlist, // DocumentNode object parsed with gql
            "Wishlist", // Query name
          ],
        }
      );
      // update();
      alert.show(
        {
          content: `Removed product from your wishlist`,
          title: intl.formatMessage({
            defaultMessage: "Product removed",
          }),
        },
        {
          timeout: 7500,
          type: "success",
        }
      );
    } else if (!addedToWishlist && user) {
      await setAddWishlistProduct(
        { productId },
        {
          refetchQueries: [
            userWishlist, // DocumentNode object parsed with gql
            "Wishlist", // Query name
          ],
        }
      );
      // update();
      alert.show(
        {
          content: `Added product to your wishlist`,
          title: intl.formatMessage({
            defaultMessage: "Product added",
          }),
        },
        {
          timeout: 7500,
          type: "success",
        }
      );
    }
  };

  // const onAttributeChange = (id: string, value: any, slug: string | null) => {
  //   selectProductVariantsAttributesValue(id, value);
  //   onAttributeChangeHandler(slug, value);
  // };

  const stateData = React.useMemo(
    () => ({
      category: sanitizeModel(category),
      collection: sanitizeModel(collection),
      product: sanitizeModel(product),
      // "variantId": product?.defaultVariant?.id || "",
      defaultVariant: sanitizeModel(product?.defaultVariant),
      // "selectedVariant": sanitizeModel(selectedVariant),
      shop: sanitizeModel(landing),
      products: sanitizeModel(products),
      search: sanitizeModel(search),
      wishlist: sanitizeModel(wishlist),
      user: sanitizeModel(user),
      microsite: sanitizeModel(microsite),
      vendors: sanitizeModel(builderMicrositesData),
      quantity: 1,
      theme: theme,
      cart: items,
      addToCart: (name: string, variantId: string, quantity: number) =>
        handleAddToCart(name, variantId, quantity),
      searchFor: (query: string) => handleSetSearch(query),
      searchVendor: (query: string) =>
        setMicrositesVariables({
          ...micrositesVariables,
          search: query,
        }),
      navigate: (to: string, replace: boolean) => navigate(to, { replace }),
      navigateById: (id: string, name: string) => handleNavigateById(id, name),
      navigateByItem: (item) => handleNavigateByItem(item),
      getItemUrl: (item) => handleGetItemUrl(item),
      addOrRemoveFromWishlist: (productId: string) =>
        addOrRemoveFromWishlist(productId),
      isAddedToWishlist: (productId: string) => isAddedToWishlist(productId),
      // handleAttributeChange: onAttributeChange,
      decodeId: (id: string) => atob(id).split(":")[1],
      clearFilters: clearFilters,
      loadMore: () => loadMore(),
      loadNextPage: () => loadNextPage(),
      loadPrevPage: () => loadPrevPage(),
      variantSelect: variantSelect,
    }),
    [props, builderMicrositesData]
  );

  // console.info("SANITIZED STATE DATA")
  // console.info(stateData)

  function getStoreModel() {
    if (search) return "/store/search";
    if (category) return "/store/category";
    if (collection) return "/store/collection";
    if (product) return "/store/product";
    if (landing) return "/store/landing";
    if (products) return "/store/products";
    if (wishlist) return "/store/wishlist";
    if (microsite) return "/store/microsite";
    if (vendors) return "/store/vendors";
  }

  React.useEffect(() => {
    type = maybe(() => getStoreModel(), "/store/landing");
    console.info(type);
    if (!isEditingOrPreviewing) {
      const fetchPage = async () => {
        setLoading(true);
        // const path = window.location.pathname;
        const content = await builder.get(model, { url: type }).promise();
        setPage(content);
        setLoading(false);
      };
      fetchPage();
    }
  }, [product]);

  if (!pageJson && !isEditingOrPreviewing) {
    return isLoading ? (
      <CircularProgress sx={{ placeSelf: "center" }} />
    ) : (
      <NoComponent />
    );
  } else {
    return (
      <BuilderComponent model={model} content={pageJson} data={stateData} />
    );
  }
};

export default StorePage;
