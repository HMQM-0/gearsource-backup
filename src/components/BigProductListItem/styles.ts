import { styled } from "@styles";

export const Swatch = styled.button<{
  color: string;
}>`
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${(props) => (props.color ? props.color : "#000")};
  height: 24px;
  width: 24px;
`;

export const Wrap = styled.div<{
  highlight: boolean;
}>`
  border: ${(props) =>
    props.highlight ? "2px solid #1CBEB2" : "1px solid black"};
  border-radius: 50%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
`;
