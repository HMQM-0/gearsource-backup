import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const AttributeList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 36px;

  ${media.largeScreen`
    grid-template-columns: 1fr;
  `};
  width: 100%;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 30px;
    font-size: ${(props) => props.theme.typography.h4FontSize};
  }
`;

export const Content = styled.div`
  display: block;
  font-size: 1rem;
  padding-top: ${(props) => props.theme.spacing.spacer};
`;

export const Spacer = styled.div`
  display: block;
  padding-bottom: ${(props) => props.theme.spacing.fieldSpacer};
`;

export const Tabs = styled.div`
  display: flex;
  flex-wrap: none;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.tabsBorder};
  margin-bottom: 70px;
  overflow: hidden;
`;

export const Title = styled.div`
  cursor: pointer;
  min-width: 230px;
  font-size: ${(props) => props.theme.typography.h3FontSize};
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  letter-spacing: 0.02em;
  color: ${(props) => props.theme.colors.tabTitle};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.colors.tabTitle};
  padding-bottom: 4px;

  ${media.smallScreen`
    font-size: ${(props: any) => props.theme.typography.h4FontSize};
    min-width: 150px;
    margin-right: 20px;
  `};
`;

export const AttributeName = styled.span`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  padding-bottom: 8px;
`;

/*
li::before {
    content: "•";
    margin-right: 20px;
    color: ${props => props.theme.colors.listBullet};
  }
  */
