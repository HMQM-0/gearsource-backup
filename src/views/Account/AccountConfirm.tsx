import * as React from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { StringParam, useQueryParams } from "use-query-params";

// import { RouteComponentProps } from "react-router";
import { BASE_URL } from "../../core/config";

import { TypedAccountConfirmMutation } from "./queries";

import "./scss/index.scss";

// const AccountConfirm: React.FC<RouteComponentProps> = ({ history }) => {
const AccountConfirm: React.FC<any> = () => {
  const navigate = useNavigate();
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  const alert = useAlert();

  const displayConfirmationAlert = (anyErrors) => {
    alert.show(
      {
        content:
          anyErrors.length > 0
            ? anyErrors.map((error) => error.message).join(" ")
            : "You can now log in",
        title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      },
      { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  React.useEffect(() => {
    // @ts-ignore
    this.accountManagerFn({
      variables: { email: query.email, token: query.token },
    })
      .then((result) => {
        const possibleErrors = result.data.confirmAccount.errors;
        displayConfirmationAlert(possibleErrors);
      })
      .catch(() => {
        const errors = [
          {
            message: "Something went wrong while activating your account.",
          },
        ];
        displayConfirmationAlert(errors);
      })
      .finally(() => {
        navigate(BASE_URL);
      });
  }, []);

  return (
    <TypedAccountConfirmMutation>
      {(accountConfirm) => {
        // @ts-ignore
        this.accountManagerFn = accountConfirm;
        return <Box />;
      }}
    </TypedAccountConfirmMutation>
  );
};

export default AccountConfirm;
