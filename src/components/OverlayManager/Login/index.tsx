import "./scss/index.scss";
import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import {
  LoginForm,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "../..";
import RegisterForm from "./RegisterForm";

import closeImg from "../../../images/x.svg";
import ForgottenPassword from "./ForgottenPassword";
import { Tab, Tabs } from "@mui/material";

class Login extends React.Component<
  { overlay: OverlayContextInterface; active?: "login" | "register" },
  { active: "login" | "register" }
> {
  static defaultProps = {
    active: "login",
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    this.setState({ active });
  };

  render() {
    const { overlay } = this.props;
    const { show, hide } = overlay;
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Overlay testingContext="loginOverlay" context={overlay}>
        <Box className="login">
          <Online>
            <Box className="overlay__header">
              <p className="overlay__header-text">
                <FormattedMessage defaultMessage="Nautical account" />
              </p>
              <ReactSVG
                src={closeImg}
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </Box>
            <Tabs value={value} onChange={handleTabChange} textColor="primary">
              <Tab
                label={<FormattedMessage defaultMessage="Sign in to account" />}
              />
              <Tab
                label={
                  <FormattedMessage defaultMessage="Register new account" />
                }
              />
            </Tabs>
            <Box className="login__tabs">
              <Box
                component="span"
                data-test="loginTab"
                onClick={() => this.changeActiveTab("login")}
                className={this.state.active === "login" ? "active-tab" : ""}
              >
                <FormattedMessage defaultMessage="Sign in to account" />
              </Box>
              <Box
                component="span"
                data-test="registerTab"
                onClick={() => this.changeActiveTab("register")}
                className={this.state.active === "register" ? "active-tab" : ""}
              >
                <FormattedMessage defaultMessage="Register new account" />
              </Box>
            </Box>
            <Box className="login__content">
              {this.state.active === "login" ? (
                <>
                  <LoginForm hide={hide} />
                  <ForgottenPassword
                    onClick={() => {
                      show(OverlayType.password, OverlayTheme.right);
                    }}
                  />
                </>
              ) : (
                <RegisterForm hide={hide} />
              )}
            </Box>
          </Online>
          <Offline>
            <OfflinePlaceholder />
          </Offline>
        </Box>
      </Overlay>
    );
  }
}

export default Login;
