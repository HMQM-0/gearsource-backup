import { styled } from "@styles";
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  margin-left: 0.4rem;
  svg {
    top: 0.5rem;
    left: 0.4rem;
    position: relative;
  }
  :hover {
    svg {
      top: 0.5rem;
      left: 0.4rem;
      path {
        fill: ${(props) => props.theme.colors.activeMenuOption};
      }
    }
  }
`;
