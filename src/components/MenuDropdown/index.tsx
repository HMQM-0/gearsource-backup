/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import * as React from "react";
import { Box } from "@mui/material";
import "./scss/index.scss";

class MenuDropdown extends React.Component<
  {
    head: React.ReactElement<{}>;
    content: React.ReactElement<{}>;
    suffixClass: string;
  },
  { active: boolean }
> {
  static defaultProps = {
    suffixClass: "",
  };

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  render() {
    return (
      <Box
        data-test="userButton"
        className="menu-dropdown"
        onMouseOver={() => this.setState({ active: true })}
        onMouseLeave={() => this.setState({ active: false })}
      >
        {this.props.head}

        <Box
          className={`menu-dropdown__body${` menu-dropdown__body${this.props.suffixClass}`}${
            this.state.active ? " menu-dropdown__body--visible" : ""
          }`}
        >
          {this.props.content}
        </Box>
      </Box>
    );
  }
}

export default MenuDropdown;
