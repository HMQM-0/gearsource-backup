/* tslint:disable */
import { styled } from "@styles";

export const ShippingMethodForm = styled.form`
  display: grid;
  grid-gap: 20px;
`;

export const Title = styled.h3`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const Tile = styled.label<{ checked?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  flex: 1;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.light};
  padding: 20px;
  ${(props) => props.checked && `border: 2px solid #21125E;`}
  font-size: ${(props) => props.theme.typography.smallFontSize};
`;

// cursor: pointer; --> line 23

export const TileSelect = styled.label<{ checked: boolean }>`
  cursor: pointer;
`;

export const Price = styled.span`
  color: #21125e;
`;

export const MultiSeller = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

export const MultiSeller_seller = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  width: 100%;
`;

export const MultiSeller_methods = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const MultiSeller_rows = styled.div`
  margin-top: 16px;
  display: grid;
  grid-row-gap: 6px;
  grid-column-gap: 20px;
  grid-template-columns: 60px auto 100px 100px;
`;

export const Photo = styled.div`
  width: min-content;
  img {
    height: auto;
    max-width: 60px;
  }
`;

export const FulfilledBy = styled.div`
  color: ${(props) => props.theme.colors.baseFont};
  font-size: ${(props) => props.theme.typography.smallFontSize};
  width: 100%;
`;

export const LineText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.baseFont};
  display: flex;
  overflow: hidden;
  width: auto;
`;
