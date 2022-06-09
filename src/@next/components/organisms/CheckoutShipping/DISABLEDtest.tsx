// import { mount } from "enzyme";
// import "jest-styled-components";
// import React from "react";

// import { CheckoutShipping } from ".";
// import { DEFAULT_PROPS } from "./fixtures";

describe.skip("<CheckoutShipping />", () => {
  // it("renders shipping methods", () => {
  //   const selectShippingMethod = jest.fn();
  //   const wrapper2 = mount(
  //     <CheckoutShipping
  //       {...DEFAULT_PROPS }
  //       selectShippingMethod={selectShippingMethod}
  //       // selectedShippingMethodIds={selectedShippingMethodId}
  //     />
  //   );
  //   expect(wrapper2.exists()).toEqual(true);
  //   const renderedText = wrapper2.text();
  //   expect(renderedText.includes(DEFAULT_PROPS.shippingMethods[0].name)).toBe(
  //     true
  //   );
  //   expect(renderedText.includes(DEFAULT_PROPS.shippingMethods[1].name)).toBe(
  //     true
  //   );
  // });
  // it("simulates change and submit events", (done) => {
  //   const selectShippingMethod = jest.fn();
  //   const wrapper2 = mount(
  //     <CheckoutShipping
  //       {...DEFAULT_PROPS}
  //       selectShippingMethod={selectShippingMethod}
  //     />
  //   );
  //   const input = wrapper2.find("input").at(0);
  //   const form = wrapper2.find("form");
  //   const shippingMethodId = DEFAULT_PROPS.shippingMethods[0].id;
  //   input.simulate("change", {
  //     target: { value: shippingMethodId },
  //   });
  //   form.simulate("submit");
  //   // delay checking the assertion since Formik handler within component is evaluated asynchronously
  //   window.setTimeout(() => {
  //     expect(selectShippingMethod).toHaveBeenCalledWith(shippingMethodId);
  //     done();
  //   }, 0);
  // });
});
