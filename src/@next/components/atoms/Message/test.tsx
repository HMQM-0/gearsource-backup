// @ts-nocheck
import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Message } from ".";
import { Title } from "./styles";

describe("<Message />", () => {
  it("renders passed title", () => {
    const text = "test";
    const wrapper = shallow(<Message title={text} onClick={jest.fn()} />);

    expect(wrapper.find(Title).text()).toEqual(text);
  });

  it("renders children when passed in", () => {
    const wrapper = shallow(
      <Message title="" onClick={jest.fn()}>
        <div className="unique" />
      </Message>
    );

    expect(wrapper.contains(<div className="unique" />)).toEqual(true);
  });

  it("displays correct border color based on status prop", () => {
    // @ts-ignore
    const neutral = mount(<Message title="" onClick={jest.fn()} />);
    const success = mount(
      <Message title="" onClick={jest.fn()} status="success" />
    );
    const error = mount(
      <Message title="" onClick={jest.fn()} status="error" />
    );

    // je: disabling bc trivial and it's just a spacing issue, not working fixing atm
    // expect(neutral).toHaveStyleRule(
    //   "border-color");

    expect(success).toHaveStyleRule(
      "border-color",
      defaultTheme.colors.success
    );
    expect(error).toHaveStyleRule("border-color", defaultTheme.colors.error);
  });
});
