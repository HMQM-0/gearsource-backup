import { Drawer, IconButton, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Online,
  LoginForm,
  Offline,
  OfflinePlaceholder,
  PasswordResetRequestForm,
} from "..";
import ForgottenPassword from "../OverlayManager/Login/ForgottenPassword";
import RegisterForm from "../OverlayManager/Login/RegisterForm";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
interface IDrawerLoginProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  close(): void;
}

const DrawerLogin: React.FunctionComponent<IDrawerLoginProps> = (props) => {
  const { anchor, open, close } = props;
  const [value, setValue] = React.useState("login");
  const [isPassword, setPassword] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Drawer anchor={anchor} open={open} ModalProps={{ onBackdropClick: close }}>
      <Box className="login">
        <Online>
          <Box className="overlay__header">
            <p className="overlay__header-text">
              {isPassword ? (
                <FormattedMessage defaultMessage="Reset password" />
              ) : (
                <FormattedMessage defaultMessage="my account" />
              )}
            </p>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Tabs
            style={{
              backgroundColor: "#efefef",
              width: "100%",
              display: isPassword ? "none" : "block",
            }}
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
          >
            <Tab
              style={{
                borderRight: "1px solid #fff",
                fontSize: "1rem",
                fontWeight: 700,
                width: "50%",
              }}
              value="login"
              label={<FormattedMessage defaultMessage="Sign in to account" />}
              wrapped
            />
            <Tab
              style={{
                borderLeft: "1px solid #fff",
                fontSize: "1rem",
                fontWeight: 700,
                width: "50%",
              }}
              value="register"
              label={<FormattedMessage defaultMessage="Register new account" />}
              wrapped
            />
          </Tabs>
          <Box
            className="login__content"
            style={{ display: isPassword ? "none" : "block" }}
          >
            {value === "login" ? (
              <>
                <LoginForm hide={close} />
                <ForgottenPassword
                  onClick={() => {
                    setPassword(true);
                    // show(OverlayType.password, OverlayTheme.right);
                  }}
                />
              </>
            ) : (
              <RegisterForm hide={close} />
            )}
          </Box>
          <Box
            className="login__content"
            style={{ display: isPassword ? "block" : "none" }}
          >
            <PasswordResetRequestForm />
            <Box className="login__content__password-reminder">
              <p>
                <FormattedMessage defaultMessage="Return to account login" />{" "}
                <Box
                  component="span"
                  className="u-link"
                  onClick={() => setPassword(false)}
                >
                  <FormattedMessage defaultMessage="Click Here" />
                </Box>
              </p>
            </Box>
          </Box>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </Box>
    </Drawer>
  );
};

export default DrawerLogin;
