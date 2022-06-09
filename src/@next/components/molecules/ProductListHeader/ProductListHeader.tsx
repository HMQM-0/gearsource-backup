import React from "react";
import Media from "react-media";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import { Chip } from "@mui/material";
import { DropdownSelect } from "@components/atoms";
import { smallScreen, xLargeScreen } from "@styles/constants";
import directory from "@temp/images/directory.svg";
import filter from "@temp/images/filter.svg";
import * as S from "./styles";
import { IProps } from "./types";
import { isMicrosite } from "@temp/core/utils";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openDirectoryMenu,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Bar>
        <S.LeftSide>
          {!!!isMicrosite() && (
            <Media query={{ maxWidth: xLargeScreen }}>
              <S.IconButton
                onClick={openDirectoryMenu}
                data-cy="directory__button"
              >
                <ReactSVG src={directory} />
                <Media query={{ minWidth: smallScreen }}>
                  <S.Filters>DIRECTORY</S.Filters>
                </Media>
              </S.IconButton>
            </Media>
          )}
          <S.FiltersButton onClick={openFiltersMenu} data-cy="filters__button">
            <ReactSVG src={filter} />
            <Media query={{ minWidth: smallScreen }}>
              <S.Filters>
                FILTERS{" "}
                {activeFilters > 0 && (
                  <>
                    <Box component="span">({activeFilters})</Box>
                  </>
                )}
              </S.Filters>
            </Media>
          </S.FiltersButton>
          {activeFilters > 0 && (
            <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </S.Clear>
          )}
        </S.LeftSide>
        <S.RightSide>
          <S.Element data-test="productsFoundCounter">
            <S.Label>
              <FormattedMessage defaultMessage="Products found:" />{" "}
            </S.Label>
            {numberOfProducts}
          </S.Element>
          <S.Element>
            <S.Sort>
              <DropdownSelect
                onChange={onChange}
                options={sortOptions}
                value={sortOptions.find(
                  (option) => option.value === activeSortOption
                )}
              />
            </S.Sort>
          </S.Element>
        </S.RightSide>
      </S.Bar>
      <S.FiltersChipsWrapper>
        {activeFiltersAttributes.map(
          ({ attributeSlug, valueName, valueSlug }) => (
            <Chip
              label={valueName}
              onDelete={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
            />
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
  );
};
