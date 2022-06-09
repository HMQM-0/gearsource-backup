import { styled } from "@styles";

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.dividerDark};
  margin: 0;
  padding: 0;
`;

export const MarginBottom = styled.div`
  margin-bottom: 30px;
`;

export const SubTextBottom = styled.div`
  color: rgba(50, 50, 50, 0.6);
  margin: 10px 0 30px 0;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const CongratulatoryText = styled.div`
  color: rgba(50, 50, 50, 0.6);
  font-size: 1.125rem;
  margin: 32.5px 0;
  text-align: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

export const DiscountAmount = styled.div`
  color: rgba(50, 50, 50, 0.6);
  font-size: 1.125rem;
  margin: 5px 0 10px 0;
  text-align: center;
`;

export const FlexCentered = styled.div` 
  display: "flex", 
  justify-content: "center" 
`;

export const SubTextTop = styled.div`
  color: rgba(50, 50, 50, 0.6);
  margin: 10px 0 5px 0;
`;

export const mainText = styled.div`
  fontsize: "1.125rem";
`;

export const customSliderStyles = {
  color: "#0082a0",
  "& .MuiSlider-thumb": {
    width: "15px",
    height: "15px",
  },
  "& .MuiSlider-root": {
    height: "3px",
  },
  "& .MuiSlider-thumb.Mui-active": {
    boxShadow: "none",
  },
  "& .MuiSlider-thumb:hover": {
    boxShadow: "none",
  },
  "& .MuiSlider-thumb.Mui-focusVisible": {
    boxShadow: "none",
  },
};
