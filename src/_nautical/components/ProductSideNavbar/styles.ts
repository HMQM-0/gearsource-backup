import { styled } from "@styles";
import { Link as _Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { css } from "styled-components";

import { NavLink as _NavLink } from "@components/atoms";

// import { NAVBAR_HEIGHT } from "@components/organisms/TopNavbar/styles";

// padding: 0 25px 0px 15px;
const NAVBAR_HEIGHT = "2.5rem";

const ListTitleItemStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  transition: 300ms;
  height: ${NAVBAR_HEIGHT};
  width: 100%;
  ${({ theme }) => `
    font-size: ${theme.typography.baseFontSize};
    font-weight: ${theme.typography.boldFontWeight};
  `}

  path {
    transition: 300ms;
  }

  &:hover,
  &:focus {
    ${({ theme }) => `
      color: ${theme.colors.primary};
    `}

    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ListItemStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  transition: 300ms;
  height: ${NAVBAR_HEIGHT};
  width: 100%;
  ${({ theme }) => `
    font-size: ${theme.typography.baseFontSize};
  `}

  path {
    transition: 300ms;
  }

  &:hover,
  &:focus {
    ${({ theme }) => `
      color: ${theme.colors.primary};
    `}

    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Wrapper = styled.div`
  overflow: scroll;
  width: 410px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
`;

export const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  padding: 0;

  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  font-size: ${(props) => props.theme.typography.h3FontSize};
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${NAVBAR_HEIGHT};
  padding: 0 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
`;

export const Menu = styled.ul`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li``;

export const NavButton = styled.button`
  ${ListItemStyles};
`;

// export const TitleNavButton = styled.button`
export const TitleNavButton = styled(_NavLink)`
  ${ListTitleItemStyles};
`;

export const NavLink = styled(_NavLink).attrs({
  fullWidth: true,
})`
  ${ListItemStyles};
  font-weight: normal !important;
  text-transform: none !important;
`;

export const Link = styled(_Link)`
  ${ListItemStyles};
`;

export const LogoWrapper = styled(ReactSVG)`
  line-height: 0;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const IconWrapper = styled.span`
  line-height: 1;
  margin-right: ${({ theme }) => theme.spacing.spacer};
`;

export const SubcategoryIcon = styled.div`
  margin-left: auto;
`;

/* export const BackButton = styled(NavButton)`
  color: #7d7d7d;
  padding: 0;

  &:hover {
    background-color: transparent;
  }
`; */

export const CloseIconWrapper = styled.button`
  padding: 5px;

  path {
    transition: 300ms;
  }

  &:hover,
  &:focus {
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ListWrapper = styled.div`
  width: 80%;
  padding-bottom: 2rem;
`;

export const ListTitle = styled.div`
  font-size: ${(props) => props.theme.typography.h4FontSize};
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
`;

export const ListItem = styled.div``;

export const ChildItem = styled.div`
  margin-left: ${(props) => props.theme.spacing.spacer};
`;

export const ListBottomBorder = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  padding-bottom: 1.25rem;
  width: 95%;
`;

export const ListViewMoreButton = styled.div`
  padding-bottom: 1.25rem;
`;
