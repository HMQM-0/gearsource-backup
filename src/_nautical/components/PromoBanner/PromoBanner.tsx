import { AppBar } from "@mui/material";
import * as React from "react";
import { MessageProp, NotificationBar } from "../NotificationBar";
import { TypedPromoBannerQuery } from "./queries";
// import { DesignerData } from "../ThemeFont/types";

import "./scss/index.scss";

interface PromoBannerPromotionsData {
  display: string;
  id: string;
  link: string;
}

interface PromoBannerData {
  active: boolean;
  barColor: string;
  borderColor: string;
  promotions: PromoBannerPromotionsData[];
  speed: 5000;
  textColor: string;
}

interface IPromoBannerProps {
  content: string;
}

const PromoBanner: React.FC<IPromoBannerProps> = (props) => {
  const { content } = props;

  function resolvePromoBannerData(data): PromoBannerData {
    if (data === undefined) {
      return null;
    }
    const json = JSON.parse(data?.designerdata?.jsonContent);
    if (json !== undefined || json !== {} || json !== null) {
      const _data: PromoBannerData = json;
      return _data;
    } else {
      return null;
    }
  }

  function hasMultiple(data: PromoBannerData) {
    return data.promotions.length > 1;
  }

  function createMessageProp(content, link): MessageProp {
    return { content, link };
  }

  function mapPromotions(data: PromoBannerData) {
    const messages: MessageProp[] = data.promotions.map((promotion) =>
      createMessageProp(promotion.display, promotion.link)
    );
    return messages;
  }

  return (
    <TypedPromoBannerQuery
      variables={{
        name: "PromoBanner",
      }}
    >
      {({ data, loading }) => {
        const promo = resolvePromoBannerData(data);
        return (
          <AppBar
            className="promo_banner"
            position="static"
            style={{
              backgroundColor: loading ? "#000055" : promo.barColor,
              color: loading ? "#fff" : promo.textColor,
              borderColor: loading ? "#ccc" : promo.borderColor,
            }}
          >
            {hasMultiple(promo) ? (
              <NotificationBar
                backgroundColor={promo.barColor}
                fontColor={promo.textColor}
                messages={mapPromotions(promo)}
                sliderSettings={{
                  arrows: false,
                  autoplay: true,
                  autoplaySpeed: 5000,
                  dots: false,
                  infinite: true,
                  slidesToScroll: 1,
                  slidesToShow: 1,
                  speed: 500,
                }}
              />
            ) : (
              <>
                {promo && promo.promotions.length > 0
                  ? promo.promotions[0].display
                  : content}
              </>
            )}
          </AppBar>
        );
      }}
    </TypedPromoBannerQuery>
  );
};

export default PromoBanner;
