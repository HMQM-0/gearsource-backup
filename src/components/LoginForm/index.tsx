import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
// import { useAuth } from "@nautical/sdk";
import { useAuth } from "@nautical/react";
import { demoMode } from "@temp/constants";
import { commonMessages } from "@temp/intl";
// import { TextField } from "@mui/material";
import { Button, Form, TextField } from "..";

interface ILoginForm {
  hide?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({ hide }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  // const handleOnSubmit = async (evt, { email, password }) => {
  const handleOnSubmit = async (evt, { email, password }) => {
    evt.preventDefault();
    setLoading(true);
    const { data, dataError } = await signIn(
      formData.email.toLowerCase(),
      formData.password
    );
    setLoading(false);
    if (!!dataError?.error) {
      setErrors(dataError.error);
    } else if (data && hide) {
      setErrors(null);
      hide();
    }
  };

  const [formData, setFormData] = React.useState(
    demoMode
      ? {
          email: "admin@example.com",
          password: "admin",
        }
      : {
          email: "",
          password: "",
        }
  );

  const intl = useIntl();

  return (
    <Box className="login-form">
      <Form data={formData} errors={errors} onSubmit={handleOnSubmit}>
        <TextField
          name="email"
          autoComplete="email"
          label={intl.formatMessage(commonMessages.eMail)}
          type="email"
          required
          onChange={(event) =>
            setFormData({
              ...formData,
              email: event.target.value,
            })
          }
        />
        <TextField
          name="password"
          autoComplete="password"
          label={intl.formatMessage(commonMessages.password)}
          type="password"
          required
          onChange={(event) =>
            setFormData({
              ...formData,
              password: event.target.value,
            })
          }
        />
        <Box className="login-form__button">
          <Button
            testingContext="submit"
            type="submit"
            {...(loading && { disabled: true })}
          >
            {loading
              ? intl.formatMessage(commonMessages.loading)
              : intl.formatMessage({ defaultMessage: "Sign in" })}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default LoginForm;
