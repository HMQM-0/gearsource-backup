import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { Icon, Input } from "@components/atoms";
import { InputSelect } from "@components/molecules";
import { useSelectableProductVariantsAttributeValues } from "@hooks";
// import { ProductDetails_product_variants } from "@nautical/sdk/lib/queries/gqlTypes/ProductDetails";
import { ProductDetails_product_variants } from "@nautical/queries/gqlTypes/ProductDetails";
import {
  IProductVariantsAttribute,
  IProductVariantsAttributesSelectedValues,
} from "@types";

import { SelectSidebar } from "../SelectSidebar";
import * as S from "./styles";

export interface Palette {
  key: string;
  value: string;
}

export const CircleSelector: React.FC<{
  color: string;
  highlight: boolean;
  palette: IProductVariantsAttribute;
  text: string;
  onClick(): void;
}> = ({ color, highlight, palette, onClick, text }) => {
  function deriveColor() {
    //const colorPalette = JSON.parse(palette.attribute.metadata?.value);
    //return colorPalette[color];
    return color;
  }

  return (
    <S.Wrap highlight={highlight}>
      <S.Swatch
        color={deriveColor()}
        highlight={highlight}
        onClick={onClick}
      ></S.Swatch>
    </S.Wrap>
  );
};

export const ProductVariantAttributeButtons: React.FC<{
  selectSidebar: boolean;
  selectSidebarTarget?: HTMLElement | null;
  productVariantsAttributeId: string;
  productVariants: ProductDetails_product_variants[];
  productVariantsAttribute: IProductVariantsAttribute;
  productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
  onChangeSelection: (value: any, name?: any) => void;
  onClearSelection: () => void;
  defaultValue?: string;
  type?: string;
}> = ({
  selectSidebar = false,
  selectSidebarTarget,
  productVariantsAttributeId,
  productVariants,
  productVariantsAttribute,
  productVariantsAttributesSelectedValues,
  onChangeSelection,
  onClearSelection,
  defaultValue,
  type,
}) => {
  const [showSelectSidebar, setShowSelectSidebar] = React.useState(false);
  const selectableProductVariantsAttributeValues =
    useSelectableProductVariantsAttributeValues(
      productVariantsAttributeId,
      productVariants,
      productVariantsAttributesSelectedValues
    );
  const intl = useIntl();

  const selectedAttribute =
    productVariantsAttributesSelectedValues &&
    productVariantsAttributesSelectedValues[productVariantsAttributeId];

  const selectedValue = selectedAttribute && {
    disabled: false,
    id: selectedAttribute.id,
    label: selectedAttribute.name!,
    value: selectedAttribute.value!,
  };

  const attributeOptions = productVariantsAttribute.values
    .filter((value) => value)
    .map((value) => {
      const selectableAttribute =
        selectableProductVariantsAttributeValues[productVariantsAttributeId];
      const isOptionDisabled =
        selectableAttribute && !selectableAttribute.values.includes(value);

      return {
        disabled: isOptionDisabled,
        id: value.id,
        label: value.name!,
        value: value.value!,
        extra: value.extra!,
      };
    });

  const selectLabel = productVariantsAttribute.attribute.name || "";

  const selectedValuesList = selectedValue ? [selectedValue.value] : [];

  const disabledValuesList = attributeOptions
    .filter((optionValue) => optionValue.disabled)
    .map((optionValue) => optionValue.value);

  const onSelectValueHandler = (optionValue: string, callback?: () => void) => {
    if (
      disabledValuesList.every((disabledValue) => disabledValue !== optionValue)
    ) {
      onChangeSelection(optionValue);
      if (callback) {
        callback();
      }
    }
  };

  const handleSelectValueInSidebar = (optionValue: string) =>
    onSelectValueHandler(optionValue, () => setShowSelectSidebar(false));

  const getRightInputContent = (isInputFilled: boolean) => {
    if (isInputFilled) {
      return (
        <S.SelectIndicator onClick={onClearSelection}>
          <Icon name="select_x" size={10} />
        </S.SelectIndicator>
      );
    }
    return (
      <S.SelectIndicator onClick={() => setShowSelectSidebar(true)}>
        <Icon name="subcategories" size={10} />
      </S.SelectIndicator>
    );
  };

  useEffect(() => {
    if (defaultValue) {
      onSelectValueHandler(defaultValue);
      // console.info(productVariantsAttribute.attribute.metadata);
    }
  }, [defaultValue]);

  if (selectSidebar) {
    return (
      <>
        <S.Flexwrap>
          <S.Label>{type}</S.Label>
          <S.Flexbox>
            {type === "Color" ? (
              <>
                {attributeOptions.map((attribute, index) => {
                  return (
                    <CircleSelector
                      color={attribute.extra}
                      palette={productVariantsAttribute}
                      highlight={
                        selectedValue
                          ? selectedValue.value === attribute.value
                          : false
                      }
                      key={index}
                      onClick={() =>
                        handleSelectValueInSidebar(attribute.value)
                      }
                      text={attribute.label}
                    ></CircleSelector>
                  );
                })}
              </>
            ) : (
              <>
                {attributeOptions.map((attribute, index) => {
                  return (
                    <S.Button
                      highlight={
                        selectedValue
                          ? selectedValue.value === attribute.value
                          : false
                      }
                      key={index}
                      onClick={() =>
                        handleSelectValueInSidebar(attribute.value)
                      }
                    >
                      {attribute.label}
                    </S.Button>
                  );
                })}
              </>
            )}
          </S.Flexbox>
        </S.Flexwrap>
        {true ? null : (
          <>
            <Input
              onFocus={() => setShowSelectSidebar(true)}
              label={selectLabel}
              value={selectedValue ? selectedValue.value : ""}
              onChange={() => null}
              contentRight={getRightInputContent(!!selectedValue)}
              readOnly
              name={
                productVariantsAttribute.attribute.slug
                  ? productVariantsAttribute.attribute.slug
                  : ""
              }
              data-test="variantPicker"
            />
            <SelectSidebar
              options={attributeOptions}
              selectedOptions={selectedValuesList}
              disabledOptions={disabledValuesList}
              title={intl.formatMessage(
                {
                  defaultMessage: "Please select {selectLabel}",
                },
                { selectLabel }
              )}
              show={showSelectSidebar}
              hide={() => setShowSelectSidebar(false)}
              onSelect={handleSelectValueInSidebar}
              target={selectSidebarTarget}
              testingContextId={
                productVariantsAttribute.attribute.slug
                  ? productVariantsAttribute.attribute.slug
                  : ""
              }
            />
          </>
        )}
      </>
    );
  }
  return (
    <InputSelect
      name={productVariantsAttribute.attribute.id}
      label={selectLabel}
      value={selectedValue}
      options={attributeOptions}
      isOptionDisabled={(optionValue) => optionValue.disabled}
      onChange={(optionValue) => onChangeSelection(optionValue?.value)}
      clearable
      clearValue={onClearSelection}
    />
  );
};
