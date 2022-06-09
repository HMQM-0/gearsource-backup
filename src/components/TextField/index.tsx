import * as React from "react";

import { FormError } from "../Form";
import { Box } from "@mui/material";
import "./scss/index.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: FormError[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FormError[];
  helpText?: string;
  label?: string;
  labelColor?: string;
  textColor?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
  const baseClass = "input__field";
  const errorsClass = errors && errors.length ? " input__field--error" : "";
  const iconLeftClass = iconLeft ? " input__field--left-icon" : "";
  const styleTypeClass = styleType === "grey" ? " input__field--grey" : "";

  return baseClass.concat(errorsClass, iconLeftClass, styleTypeClass);
};
const TextField: React.FC<TextFieldProps> = ({
  label = "",
  labelColor,
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  ...rest
}) => {
  const labelStyle = labelColor ? { color: labelColor } : {};

  return (
    <Box className="input">
      {iconLeft ? (
        <Box component="span" className="input__icon-left">
          {iconLeft}
        </Box>
      ) : null}
      {iconRight ? (
        <Box component="span" className="input__icon-right">
          {iconRight}
        </Box>
      ) : null}
      <Box className="input__content">
        <input
          {...rest}
          className={generateClassName({ errors, iconLeft, styleType })}
        />
        {label ? (
          <Box component="span" className="input__label" style={labelStyle}>
            {label}
          </Box>
        ) : null}
      </Box>
      {errors && (
        <Box component="span" className="input__error">
          {errors.map((error) => error.message).join(" ")}
        </Box>
      )}
      {helpText && (
        <Box component="span" className="input__help-text">
          {helpText}
        </Box>
      )}
    </Box>
  );
};

export default TextField;
