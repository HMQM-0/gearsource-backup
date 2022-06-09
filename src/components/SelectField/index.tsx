import "./scss/index.scss";
import { Box } from "@mui/material";
import clsx from "clsx";
import * as React from "react";
import Select from "react-select";
// tslint:disable
import { Props as SelectProps } from "react-select";

type Style = "white" | "grey";

export interface SelectValue {
  label: string;
  value: string;
}

export interface SelectFieldProps<TValue> extends SelectProps<TValue> {
  label?: string;
  styleType?: Style;
}

type GenericSelectField<TValue> = React.StatelessComponent<
  SelectFieldProps<TValue>
>;

const SelectField: GenericSelectField<SelectValue> = ({
  label = "",
  styleType = "white",
  ...rest
}) => (
  <Box
    className={clsx("react-select-wrapper", {
      "react-select-wrapper--grey": styleType === "grey",
    })}
  >
    {label ? (
      <Box component="span" className="input__label">
        {label}
      </Box>
    ) : null}
    <Select classNamePrefix="react-select" {...rest} />
  </Box>
);

export default SelectField;
