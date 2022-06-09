import React from "react";
// import "./scss/index.scss";

import * as S from "./styles";

interface CompanyImageProps {
  image: any;
  link?: string;
  name?: string;
}

const CompanyImage: React.FC<CompanyImageProps> = ({ image, link, name }) => {
  function createLinkWrapper(child) {
    if (link ? true : false) {
      return <a href={link}>{child}</a>;
    } else {
      return child;
    }
  }

  return (
    <S.CompanyWrapper>
      {createLinkWrapper(<S.CompanyImage src={image} alt={name ? name : ""} />)}
    </S.CompanyWrapper>
  );
};

export default CompanyImage;
