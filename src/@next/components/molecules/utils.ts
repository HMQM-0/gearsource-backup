const getTotal = (
  targetSku: string,
  sellerFulfillments: any,
  targetFulfillmentStatus: string
) => {
  const targetFulfillments: any[] = [];
  let fulfillments;
  if (targetFulfillmentStatus === "FULFILLED") {
    fulfillments = sellerFulfillments.filter(
      (fulfillment: any) => fulfillment.status === "FULFILLED"
    );
  } else if (targetFulfillmentStatus === "RETURNED") {
    fulfillments = sellerFulfillments.filter((fulfillment: any) =>
      fulfillment.status.includes("RETURN")
    );
  }
  fulfillments.forEach((fulfillment: any) => {
    fulfillment.lines.forEach((line: any) => {
      if (line.orderLine.productSku === targetSku) {
        targetFulfillments.push(line);
      }
    });
  });
  return targetFulfillments.reduce(
    (previousFulfillment, currentFulfillment) =>
      previousFulfillment + currentFulfillment.quantity,
    0
  );
};

const getTargetFulfilledTotal = (
  targetSku: string,
  sellerFulfillments: any
) => {
  return getTotal(targetSku, sellerFulfillments, "FULFILLED");
};

const getTargetReturnedTotal = (targetSku: string, sellerFulfillments: any) => {
  return getTotal(targetSku, sellerFulfillments, "RETURNED");
};

export const getMaxQuantityReturnable = (
  line: any,
  sellerFulfillments: any
) => {
  const targetSku = line.productSku;
  const targetSkuFulfillments = getTargetFulfilledTotal(
    targetSku,
    sellerFulfillments
  );
  const targetSkuReturns = getTargetReturnedTotal(
    targetSku,
    sellerFulfillments
  );
  return targetSkuFulfillments - targetSkuReturns;
};
