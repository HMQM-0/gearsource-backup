import * as React from "react";

import { FormError } from "../Form";

import "./scss/index.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
  errors?: FormError[];
  iconLeft?: React.ReactNode;
  styleType?: Style;
}

export interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: FormError[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styleType?: Style;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
  const baseClass = "input__field";
  const errorsClass = errors && errors.length ? " input__field--error" : "";
  const iconLeftClass = iconLeft ? " input__field--left-icon" : "";
  const styleTypeClass = styleType === "grey" ? " input__field--grey" : "";

  // console.log("errorsClass: ", errorsClass);

  return baseClass.concat(errorsClass, iconLeftClass, styleTypeClass);
};
const TextArea: React.FC<TextAreaFieldProps> = ({
  label = "",
  iconLeft,
  iconRight,
  errors,
  helpText,
  styleType = "white" as Style,
  value,
  ...rest
}) => (
  <div className="input">
    {iconLeft ? <span className="input__icon-left">{iconLeft}</span> : null}
    {iconRight ? <span className="input__icon-right">{iconRight}</span> : null}
    <div className="input__content">
      <textarea
        {...rest}
        className={generateClassName({ errors, iconLeft, styleType })}
        rows={3}
        value={value}
        style={{ resize: "vertical" }}
      />
      {label ? <span className="input__label">{label}</span> : null}
    </div>
    {errors && (
      <span className="input__error">
        {errors.map((error) => error.message).join(" ")}
      </span>
    )}
    {helpText && <span className="input__help-text">{helpText}</span>}
  </div>
);

export default TextArea;
