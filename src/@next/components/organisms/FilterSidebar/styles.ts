import { styled } from "@styles";

export const Wrapper = styled.div`
  overflow: auto;
  overscroll-behavior: contain;
  width: 410px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
`;
export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 2.5rem;
  background-color: #fff;
  box-shadow: -15px 0 0 #fff;

  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  font-size: ${(props) => props.theme.typography.h3FontSize};
`;
