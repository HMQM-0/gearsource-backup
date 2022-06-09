import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ButtonLink, Checkbox } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

import { DebouncedTextField } from "../../../../components/Debounce";
import { commonMessages } from "@temp/intl";

export const AttributeValuesChecklist: React.FC<IProps> = ({
  title,
  name,
  values,
  valuesShowLimit = false,
  valuesShowLimitNumber = 5,
  onValueClick,
}: IProps) => {
  const intl = useIntl();
  const [viewAllOptions, setViewAllOptions] = React.useState(!valuesShowLimit);

  // const [valueStates, setValueStates] = React.useState(values);

  const [valueSearch, setValueSearch] = React.useState("");

  const handleValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  return (
    <S.Wrapper>
      {title && <S.Header>{title}</S.Header>}
      {values && values.length > valuesShowLimitNumber && (
        <DebouncedTextField
          onChange={(evt) => handleValueSearch(evt)}
          // value={this.state.search}
          // iconLeft={
          //   <ReactSVG
          //     src={closeImg}
          //     onClick={this.props.overlay.hide}
          //     className="search__input__close-btn"
          //   />
          // }
          // iconRight={<ReactSVG src={searchImg} />}
          style={{ textTransform: "capitalize", borderRadius: "8px" }}
          placeholder={intl.formatMessage(commonMessages.search)}
          // onBlur={this.handleInputBlur}
        />
      )}
      {values &&
        values.map((value, index) => {
          if (
            !value.name
              .toLocaleLowerCase()
              .includes(valueSearch.toLocaleLowerCase())
          ) {
            return <></>;
          }
          if (!viewAllOptions && index > valuesShowLimitNumber - 1) {
            return <></>;
          }
          return (
            <Checkbox
              name={name}
              checked={!!value.selected}
              onChange={() => onValueClick(value)}
            >
              {value && value.name}
            </Checkbox>
          );
        })}
      {!viewAllOptions && values.length > valuesShowLimitNumber && (
        <S.ViewMoreButton>
          <ButtonLink
            testingContext="viewAllButton"
            size="sm"
            color="secondary"
            onClick={() => setViewAllOptions(true)}
          >
            <FormattedMessage defaultMessage="VIEW ALL OPTIONS" />
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
