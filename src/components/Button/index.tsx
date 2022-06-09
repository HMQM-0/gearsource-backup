import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import * as React from "react";

import "./scss/index.scss";

type ButtonType = "submit" | "reset" | "button";
export interface ButtonProps extends MuiButtonProps {
  //extends React.HTMLProps<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  outlined?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Used as marker for writing e2e tests
   */
  testingContext?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  // testingContext,
  primary,
  secondary,
  outlined,
  btnRef,
  type,
  ...otherProps
}) => {
  type ColorType = "inherit" | "default" | "primary" | "secondary";

  const color: ColorType = primary
    ? "primary"
    : secondary
    ? "secondary"
    : "secondary";

  return (
    <MuiButton
      className={className}
      color={color}
      variant={outlined ? "outlined" : "contained"}
      ref={btnRef}
      type={type as ButtonType}
      fullWidth
      {...otherProps}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

/* 

<button
  data-test={testingContext}
  className={`button ${secondary ? "secondary" : ""} ${className}`}
  ref={btnRef}
  type={type as ButtonType}
  {...otherProps}
>
  <span>{children}</span>
</button>

*/
