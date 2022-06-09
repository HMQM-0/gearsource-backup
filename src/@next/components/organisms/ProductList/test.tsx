import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore
          loading={false}
          onLoadMore={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  // je: disabling due to enyzme's lack of support for useContext
  // it("show loading", () => {
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <ProductList
  //         products={PRODUCTS}
  //         canLoadMore
  //         loading
  //         onLoadMore={jest.fn()}
  //       />
  //     </BrowserRouter>
  //   );

  //   expect(wrapper.text()).not.toContain("More +");
  // });

  // je: disabling due to enyzme's lack of support for useContext
  // it("may load more", () => {
  //   const handleLoadMore = jest.fn();

  //   const wrapper2 = mount(
  //     <BrowserRouter>
  //       <ProductList
  //         products={PRODUCTS}
  //         canLoadMore
  //         loading={false}
  //         onLoadMore={handleLoadMore}
  //       />
  //     </BrowserRouter>
  //   );

  //   expect(wrapper2.text()).toContain("More +");

  //   wrapper2.find("button").simulate("click");

  //   expect(handleLoadMore).toHaveBeenCalled();
  // });
});
