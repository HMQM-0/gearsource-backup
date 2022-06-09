const getFulfillmentsWithItem = (item: any, sellerFulfillments: any) => {
  const fulfillmentsWithItem: any[] = [];
  sellerFulfillments.forEach((fulfillment: any) => {
    const fulfillmentLines = fulfillment.lines;
    fulfillmentLines.forEach((line: any) => {
      if (line.orderLine.productName === item) {
        fulfillmentsWithItem.push({
          fulfillmentId: fulfillment.id,
          lineId: line.id,
          orderLineId: line.orderLine.id,
          status: fulfillment.status,
          relatedToFulfillmentWithId: fulfillment.relatedTo?.id
            ? fulfillment.relatedTo.id
            : null,
          qtyFulfilledOrReturned: line.quantity,
        });
      }
    });
  });
  return fulfillmentsWithItem;
};

const getQuantitiesAvailableForReturnPerFulfillment = (
  fulfillmentsWithItem: any
) => {
  const quantitiesReturnablePerFulfillment: any = {};
  for (const fulfillmentToAdjust of fulfillmentsWithItem) {
    if (fulfillmentToAdjust.status === "FULFILLED") {
      let returnableQuantity = fulfillmentToAdjust.qtyFulfilledOrReturned;
      for (const fulfillment of fulfillmentsWithItem) {
        if (
          fulfillment.status.includes("RETURN") &&
          fulfillment.relatedToFulfillmentWithId ===
            fulfillmentToAdjust.fulfillmentId
        ) {
          returnableQuantity -= fulfillment.qtyFulfilledOrReturned;
        }
      }
      quantitiesReturnablePerFulfillment[fulfillmentToAdjust.fulfillmentId] = {
        fulfillmentId: fulfillmentToAdjust.fulfillmentId,
        lineId: fulfillmentToAdjust.lineId,
        orderLineId: fulfillmentToAdjust.orderLineId,
        quantity: fulfillmentToAdjust.qtyFulfilledOrReturned,
        returnableQuantity: returnableQuantity,
      };
    }
  }
  return quantitiesReturnablePerFulfillment;
};

const getPayloadElement = (
  fulfillmentInfo: any,
  quantityToReturn: any,
  returnReason: string
) => {
  return {
    fulfillmentId: fulfillmentInfo.fulfillmentId,
    lineId: fulfillmentInfo.lineId,
    orderLineId: fulfillmentInfo.orderLineId,
    quantity: fulfillmentInfo.quantity,
    returnRequestedQty: quantityToReturn,
    decision: "RETURN_REQUESTED",
    returnReason: returnReason,
  };
};

export const constructPayloadElements = (
  item: any,
  itemInfo: any,
  order: any
) => {
  const sellerFulfillments = order.sellerFulfillments;
  const fulfillmentsWithItem = getFulfillmentsWithItem(
    item,
    sellerFulfillments
  );
  const quantitiesAvailableForReturnPerFulfillment =
    getQuantitiesAvailableForReturnPerFulfillment(fulfillmentsWithItem);

  let quantityToReturn = itemInfo.quantity;
  let returnReason = itemInfo.returnReason;
  const payloadElements: any[] = [];
  for (const availableFulfillment in quantitiesAvailableForReturnPerFulfillment) {
    const fulfillmentInfo =
      quantitiesAvailableForReturnPerFulfillment[availableFulfillment];
    if (fulfillmentInfo.returnableQuantity >= quantityToReturn) {
      const payloadElement = getPayloadElement(
        fulfillmentInfo,
        quantityToReturn,
        returnReason
      );
      payloadElements.push(payloadElement);
      break;
    } else {
      const payloadElement = getPayloadElement(
        fulfillmentInfo,
        fulfillmentInfo.returnableQuantity,
        returnReason
      );
      payloadElements.push(payloadElement);
      quantityToReturn -= fulfillmentInfo.returnableQuantity;
    }
  }
  return payloadElements;
};
