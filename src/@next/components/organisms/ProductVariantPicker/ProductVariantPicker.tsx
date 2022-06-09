import React, { useEffect } from "react";

import {
  useProductVariantsAttributes,
  useProductVariantsAttributesValuesSelection,
} from "@hooks";
// import { ProductDetails_product_variants } from "@nautical/sdk/lib/queries/gqlTypes/ProductDetails";
import { ProductDetails_product_variants } from "@nautical/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";
import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import * as S from "./styles";
import { ProductVariantAttributeButtons } from "./ProductVariantAttributeButtons";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { TaxedMoney } from "@components/containers";
import { Form, Formik } from "formik";
import Loader from "@temp/components/Loader";
import { useAuth, useCart } from "@nautical/react";
// @ts-ignore
import { useAlert } from "react-alert";
// import AddToCartButton from "@components/molecules/AddToCartButton";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { FormattedMessage } from "react-intl";
// import QuantityInput from "@components/molecules/QuantityInput";

export interface IProductVariantPickerProps {
  productVariants?: ProductDetails_product_variants[];
  onChange?: (
    selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants | undefined
  ) => void;
  selectSidebar?: boolean;
  selectSidebarTarget?: HTMLElement | null;
  queryAttributes: Record<string, string>;
  wholesaleView?: boolean;
  onAttributeChangeHandler: (slug: string | null, value: string) => void;
}

const ProductVariantPicker: React.FC<IProductVariantPickerProps> = ({
  productVariants = [],
  queryAttributes = {},
  onAttributeChangeHandler,
  onChange,
  selectSidebar = false,
  selectSidebarTarget,
  wholesaleView = false,
}) => {
  const { loginForPrice } = React.useContext(ShopContext);
  const { user } = useAuth();

  const productVariantsAttributes =
    useProductVariantsAttributes(productVariants);
  const [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ] = useProductVariantsAttributesValuesSelection(productVariantsAttributes);
  const { addItem } = useCart();
  const alert = useAlert();

  useEffect(() => {
    const selectedVariant = productVariants.find((productVariant) => {
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
    if (onChange) {
      onChange(productVariantsAttributesSelectedValues, selectedVariant);
    }
  }, [productVariantsAttributesSelectedValues]);

  const onAttributeChange = (id: string, value: any, slug: string | null) => {
    selectProductVariantsAttributesValue(id, value);
    onAttributeChangeHandler(slug, value);
  };

  // @ts-ignore
  const [initialValues, setInitialValues] = React.useState({});

  React.useEffect(() => {
    const vals = {};
    productVariants?.map((variant) => {
      // @ts-ignore
      vals[variant.id] = 0;
    });
    setInitialValues(vals);
  }, [productVariants]);

  return wholesaleView && productVariants?.length > 1 ? (
    <S.Wrapper>
      {Object.keys(initialValues).length > 0 ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            Object.keys(values).forEach((value) =>
              // @ts-ignore
              addItem(value, values[value])
            );
            alert.show(
              {
                // @ts-ignore
                title:
                  "Added " +
                  // @ts-ignore
                  Object.values(values).reduce((a, b) => a + b) +
                  " items to cart",
              },
              { type: "success" }
            );
            // setTimeout(() => {
            //   console.info(JSON.stringify(values, null, 2));
            //   alert(JSON.stringify(values, null, 2));
            //   actions.setSubmitting(false);
            // }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Table
                style={{ border: "2px solid #f6f6f6", borderRadius: "4px" }}
              >
                <TableHead>
                  <TableCell>Variant</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Available</TableCell>
                </TableHead>
                {productVariants?.map((variant) => {
                  return (
                    <TableRow>
                      <TableCell>{variant.name}</TableCell>
                      <TableCell>
                        <TextField
                          name={variant.id}
                          type="number"
                          // label={intl.formatMessage(commonMessages.quantity)}
                          // defaultValue="1"
                          // @ts-ignore
                          value={Math.max(props.values[variant.id], 0)}
                          disabled={
                            variant.quantityAvailable === 0 ||
                            (!user && loginForPrice)
                          }
                          onChange={props.handleChange}
                        />
                      </TableCell>
                      <TableCell>
                        {!user && loginForPrice ? (
                          <FormattedMessage
                            defaultMessage={"Login for price"}
                          />
                        ) : (
                          <>
                            {variant.pricing?.onSale && (
                              <Box
                                style={{
                                  textDecoration: "line-through",
                                  width: "100%",
                                }}
                              >
                                <TaxedMoney
                                  taxedMoney={
                                    variant.pricing?.priceUndiscounted
                                  }
                                />
                              </Box>
                            )}
                            <TaxedMoney taxedMoney={variant.pricing?.price} />
                          </>
                        )}
                      </TableCell>
                      <TableCell>{variant.quantityAvailable}</TableCell>
                    </TableRow>
                  );
                })}
              </Table>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={props.submitForm}
                // @ts-ignore
                disabled={
                  // @ts-ignore
                  Object.values(props.values).reduce((a, b) => a + b) < 1
                }
              >
                <FormattedMessage defaultMessage="Add to cart" />
              </Button>
              {/* <AddToCartButton
                //   onSubmit={props.handleSubmit}
                //   // @ts-ignore
                //   disabled={Object.values(props.values).reduce((a, b) => a + b) < 1}
                // /> */}
            </Form>
          )}
        </Formik>
      ) : (
        <Loader />
      )}
      {/* Object.keys(productVariantsAttributes).map(
          productVariantsAttributeId => {
            const productVariantsAttribute =
              productVariantsAttributes[productVariantsAttributeId];
            const { slug } = productVariantsAttribute.attribute;
            return slug
          }
        ) */}
    </S.Wrapper>
  ) : (
    <S.Wrapper>
      {Object.keys(productVariantsAttributes).map(
        (productVariantsAttributeId) => {
          const productVariantsAttribute =
            productVariantsAttributes[productVariantsAttributeId];
          const { slug } = productVariantsAttribute.attribute;

          return (
            <>
              {productVariantsAttribute.attribute.name === "Size" ||
              productVariantsAttribute.attribute.name === "Color" ? (
                <ProductVariantAttributeButtons
                  type={productVariantsAttribute.attribute.name}
                  key={productVariantsAttributeId}
                  selectSidebar={selectSidebar}
                  selectSidebarTarget={selectSidebarTarget}
                  productVariants={productVariants}
                  productVariantsAttributeId={productVariantsAttributeId}
                  productVariantsAttribute={productVariantsAttribute}
                  defaultValue={queryAttributes[productVariantsAttributeId]}
                  productVariantsAttributesSelectedValues={
                    productVariantsAttributesSelectedValues
                  }
                  onChangeSelection={(optionValue) =>
                    onAttributeChange(
                      productVariantsAttributeId,
                      optionValue,
                      slug
                    )
                  }
                  onClearSelection={() =>
                    onAttributeChange(productVariantsAttributeId, null, slug)
                  }
                />
              ) : (
                <ProductVariantAttributeSelect
                  key={productVariantsAttributeId}
                  selectSidebar={selectSidebar}
                  selectSidebarTarget={selectSidebarTarget}
                  productVariants={productVariants}
                  productVariantsAttributeId={productVariantsAttributeId}
                  productVariantsAttribute={productVariantsAttribute}
                  defaultValue={queryAttributes[productVariantsAttributeId]}
                  productVariantsAttributesSelectedValues={
                    productVariantsAttributesSelectedValues
                  }
                  onChangeSelection={(optionValue) =>
                    onAttributeChange(
                      productVariantsAttributeId,
                      optionValue,
                      slug
                    )
                  }
                  onClearSelection={() =>
                    onAttributeChange(productVariantsAttributeId, null, slug)
                  }
                />
              )}
            </>
          );
        }
      )}
    </S.Wrapper>
  );
};
ProductVariantPicker.displayName = "ProductVariantPicker";
export default ProductVariantPicker;
