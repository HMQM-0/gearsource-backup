import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
export const SelectIndicator = styled.div`
  margin: 0 1rem 0 0;
  cursor: pointer;
`;

export const Flexbox = styled.div`
  display: flex;
  gap: 8px;
  margin: 4px 0px;
`;

export const Button = styled.button<{
  highlight: boolean;
}>`
  border-radius: 4px;
  border: 1px solid black;
  background-color: ${(props) => (props.highlight ? "#039387" : "transparent")};
  color: ${(props) => (props.highlight ? "#fff" : "inherit")};
  padding: 8px;
  width: 38px;
`;

export const Swatch = styled.button<{
  color: string;
  highlight: boolean;
}>`
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => (props.color ? props.color : "#000")};
  height: 36px;
  width: 36px;
`;

export const Wrap = styled.div<{
  highlight: boolean;
}>`
  border: ${(props) =>
    props.highlight ? "2px solid #1CBEB2" : "1px solid black"};
  border-radius: 50%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
`;

export const Label = styled.label`
  font-size: ${(props) => props.theme.input.labelFontSize};
  pointer-events: none;
`;

export const Flexwrap = styled.div`
  padding: 8px 0px;
`;

// padding: 0 0.5rem;
// border: ${(props) => props.highlight ? '3px solid #1CBEB2':'1px solid black'};
