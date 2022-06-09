import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.colors.tableDivider};
`;

// @ts-ignore
export const HeaderRow = styled(Row)`
  color: ${(props) => props.theme.colors.lightFont};
  cursor: default;
`;

export const CheckBox = styled.div`
  width: 4%;
  ${media.smallScreen`
     width: 4%;
  `}
`;

export const ProductImage = styled.div`
  width: 15%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  img {
    max-width: 50px;
    height: auto;
  }
`;

export const ProductName = styled.div`
  width: 30%;
`;

export const QuantityPurchased = styled.div`
  width: 10%;
`;

export const ItemPrice = styled.div`
  width: 20%;
`;

export const ReturnQuantity = styled.div`
  width: 15%;
  margin-right: 1rem;
`;

export const ReturnReason = styled.div`
  width: 30%;
  ${media.smallScreen`
    width: 60%;
  `}
`;

export const ReturnMessage = styled.div`
  width: 45%;
  margin-right: 1rem;
`;

export const Button = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem 1rem 0 0;
`;
