import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";
import * as S from "./styles";
import { IProps } from "./types/IProps";
import { Typography } from "@mui/material";
import { LineItem } from "./LineItem";
import { commonMessages } from "@temp/intl";
import {
  useBulkFulfillmentReturn,
  useNauticalBulkFulfillmentReturnDashboardNotification,
  useVendorBulkFulfillmentReturnDashboardNotification,
} from "@temp/@nautical/react/mutations";
// import {
//   generateMicrositeUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "@temp/core/utils";
import { constructPayloadElements } from "./utils";
import { OrderReturnPayload } from "@temp/@nautical/mutations/gqlTypes/OrderReturn";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export const OrderLinesTable = ({ order }: IProps) => {
  const navigate = useNavigate();
  // STATE
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [itemInfo, setItemInfo] = React.useState({});
  const [returnSubmissionError, setReturnSubmissionError] =
    React.useState(false);

  // CONTEXT
  const theme = React.useContext(ThemeContext);

  // MUTATIONS
  const [setBulkFulfillmentReturn] = useBulkFulfillmentReturn();
  const [setNauticalBulkFulfillmentReturnDashboardNotification] =
    useNauticalBulkFulfillmentReturnDashboardNotification();
  const [setVendorBulkFulfillmentReturnDashboardNotification] =
    useVendorBulkFulfillmentReturnDashboardNotification();

  // HELPER FUNCTIONS
  const getPayload = () => {
    const payload: OrderReturnPayload[] = [];
    for (const item in itemInfo) {
      // @ts-ignore
      const currentItem = itemInfo[item];
      const isChecked = currentItem.isChecked;
      const hasAllNeededInfo =
        currentItem.quantity !== undefined &&
        currentItem.returnReason !== undefined;
      if (isChecked && hasAllNeededInfo) {
        const payloadElements = constructPayloadElements(
          item,
          currentItem,
          order
        );
        payload.push(...payloadElements);
      }
    }
    return payload;
  };

  const formErrorsExist = () => {
    const emptyItemInfo = Object.keys(itemInfo).length === 0;
    if (emptyItemInfo) {
      return true;
    }

    let noItemsChecked = true;
    for (const item in itemInfo) {
      // @ts-ignore
      const currentItem = itemInfo[item];
      const isChecked = currentItem.isChecked;
      const missingInfo =
        currentItem.quantity === undefined ||
        currentItem.returnReason === undefined;
      if (isChecked) {
        noItemsChecked = false;
      }
      if (isChecked && missingInfo) {
        return true;
      }
    }
    if (noItemsChecked) {
      return true;
    }
    return false;
  };

  const getProductNames = () => {
    const productNames: string[] = [];
    for (const product in itemInfo) {
      productNames.push(product);
    }
    return productNames;
  };

  // EVENT HANDLERS
  const handleSubmit = async () => {
    if (formErrorsExist()) {
      setShowErrorMessage(true);
      return;
    } else {
      setShowErrorMessage(false);
      const payload = getPayload();
      // CREATE RETURN REQUEST
      const returns = await setBulkFulfillmentReturn({
        input: payload,
      });
      // @ts-ignore
      const errors = returns.data.bulkFulfillmentReturn.errors;
      if (errors?.length === 0) {
        // NAUTICAL RETURN NOTIFICATION MUTATION
        const nauticalNotification =
          await setNauticalBulkFulfillmentReturnDashboardNotification({
            order: order.id,
            input: { returnStatus: "RETURN_REQUESTED" },
          });
        // NAUTICAL RETURN NOTIFICATION ERROR HANDLING
        const nauticalNotificationErrors =
          // @ts-ignore
          nauticalNotification?.data
            ?.nauticalOrderReturnFromStorefrontNotification?.errors.length > 0;
        if (nauticalNotificationErrors) {
          console.error(
            "nauticalNotificationErrors: ",
            nauticalNotificationErrors
          );
        }
        // VENDOR RETURN NOTIFICATION MUTATION
        const productNames = JSON.stringify(getProductNames());
        const vendorNotification =
          await setVendorBulkFulfillmentReturnDashboardNotification({
            order: order.id,
            input: {
              productNames,
              returnStatus: "RETURN_REQUESTED",
            },
          });
        // VENDOR RETURN NOTIFICATION ERROR HANDLING
        const vendorNotificationErrors =
          // @ts-ignore
          vendorNotification?.data?.vendorOrderReturnFromStorefrontNotification
            ?.errors.length > 0;
        if (vendorNotificationErrors) {
          console.error("vendorNotificationErrors: ", vendorNotificationErrors);
        }
        navigate(
          // !!isMicrosite()
          //   ? `${generateMicrositeUrl(
          //       getMicrositeId(),
          //       getMicrositeSlug()
          //     )}/order-return-request-confirmation/${order.token}`
          `/order-return-request-confirmation/${order.token}`,
          {
            state: {
              // @ts-ignore
              returns: returns.data.bulkFulfillmentReturn,
              order,
            },
          }
        );
      } else {
        setReturnSubmissionError(true);
      }
    }
  };

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {() => {
          return (
            <>
              <Typography
                variant="subtitle1"
                style={{ color: theme.colors.lightFont, marginTop: "0.5rem" }}
              >
                Order Number {order?.number}
              </Typography>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", marginTop: "0.25rem" }}
              >
                Choose Items To Return
              </Typography>
              {/* HEADER ROW */}
              <S.HeaderRow>
                <S.CheckBox />
                <S.ProductImage />
                <S.ProductName />
                <S.QuantityPurchased>
                  <FormattedMessage defaultMessage="Quantity Purchased" />
                </S.QuantityPurchased>
                <S.ItemPrice>
                  <FormattedMessage defaultMessage="Item Price" />
                </S.ItemPrice>
                <S.ReturnQuantity>
                  <FormattedMessage defaultMessage="Return Quantity" />
                </S.ReturnQuantity>
                <S.ReturnReason>
                  <FormattedMessage defaultMessage="Return Reason" />
                </S.ReturnReason>
              </S.HeaderRow>
              {/* ROWS */}
              {order &&
                order.lines.map((line) => {
                  return (
                    <LineItem
                      key={line && line.variant && line.variant.id}
                      line={line}
                      sellerFulfillments={order.sellerFulfillments}
                      setShowErrorMessage={setShowErrorMessage}
                      itemInfo={itemInfo}
                      setItemInfo={setItemInfo}
                    />
                  );
                })}
              {showErrorMessage && (
                <Typography variant="subtitle1" style={{ color: "red" }}>
                  Please select at least one item and for each selected item
                  choose a Return Quantity and Return Reason.
                </Typography>
              )}
              {returnSubmissionError && (
                <Typography variant="subtitle1" style={{ color: "red" }}>
                  There was an issue processing your return request. Please
                  contact your administrator.
                </Typography>
              )}
              <S.Button>
                <Button
                  type="submit"
                  size="small"
                  style={{
                    height: "30px",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 5px #888888",
                  }}
                  onClick={handleSubmit}
                >
                  <FormattedMessage {...commonMessages.submit} />
                </Button>
              </S.Button>
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
