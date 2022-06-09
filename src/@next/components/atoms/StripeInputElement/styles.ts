import { DefaultTheme, styled } from "@styles";
import { useTheme } from "@mui/material";

type WrapperProps = {
  active: boolean;
  error: boolean;
  theme: DefaultTheme;
};

const getEdgeColor = (
  { active, error, theme }: WrapperProps,
  hovered = false
) => {
  const muiTheme = useTheme();
  if (error) {
    return theme.colors.error;
  }

  if (hovered) {
    return muiTheme.palette.primary.main;
  }

  return active ? muiTheme.palette.primary.main : muiTheme.palette.grey[500];
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: 1px solid ${(props) => getEdgeColor(props)};
  border-radius: 4px;
  color: ${(props) => getEdgeColor(props)};
  height: 56px;
  outline: ${(props) =>
    props.active ? `1px solid ${getEdgeColor(props)};` : "none"};
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => getEdgeColor(props, true)};
    outline-width: 1px;
    outline-style: solid;
    border-color: ${(props) => getEdgeColor(props, true)};
    outline-color: ${(props) => getEdgeColor(props, true)};
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div``;

// position: relative;
// width: 100%;
