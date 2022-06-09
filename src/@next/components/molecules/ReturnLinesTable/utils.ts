export const augmentLine = (returnLine: any, orderLines: any[]) => {
  const targetOrderLine = orderLines.filter(
    (orderLine: any) =>
      orderLine.productName === returnLine.orderLine.productName
  )[0];
  const augmentedReturnLine = {
    ...returnLine,
    variant: targetOrderLine.variant,
  };
  return augmentedReturnLine;
};
