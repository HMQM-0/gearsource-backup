import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { RichTextContent } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

import { ShopContext } from "@temp/components/ShopProvider/context";
import { RatingsAndReviews } from "./RatingsAndReviews";

export const ProductDescription: React.FC<IProps> = ({
  description = "",
  descriptionJson = "",
  attributes,
  features,
  productId,
  ratingsAndReviewsSectionRef,
}: IProps) => {
  const { activePlugins } = React.useContext(ShopContext);
  const yotpoRatingsAndReviewsPluginActive = Boolean(
    activePlugins.find(
      (plugin) => plugin.identifier === "nautical.reviews.yotpo"
    )
  );

  return (
    <Box>
      <Typography color="primary" variant="h6">
        DESCRIPTION
      </Typography>
      <Divider />
      <Box pt={1}>
        {descriptionJson ? (
          <RichTextContent descriptionJson={descriptionJson} />
        ) : (
          <p>{description}</p>
        )}
      </Box>
      {attributes.length > 0 ? (
        <>
          <Box pb={2} />
          <Typography color="primary" variant="h6" style={{ display: "none" }}>
            ATTRIBUTES
          </Typography>
          <Box pt={1}>
            <S.AttributeList>
              {attributes
                .filter((attribute) => attribute.values == [])
                .map((attribute, index) => (
                  <li key={index}>
                    <S.AttributeName>
                      {attribute.attribute.name}:{" "}
                    </S.AttributeName>{" "}
                    {attribute.values.map((value) => value.name).join(", ")}
                  </li>
                ))}
            </S.AttributeList>
          </Box>
        </>
      ) : (
        ""
      )}
      {features !== null && features.length > 0 ? (
        <>
          <Box pb={2} />
          <Typography color="primary" variant="h6">
            FEATURES
          </Typography>
          <Divider />
          <Box pt={1}>
            <S.AttributeList>
              {features.map((feature, index) => (
                <li key={index}>
                  <S.AttributeName>{feature.name}</S.AttributeName>{" "}
                  <Box pt={1}>{feature.description}</Box>
                </li>
              ))}
            </S.AttributeList>
          </Box>
        </>
      ) : (
        ""
      )}
      {yotpoRatingsAndReviewsPluginActive && (
        <Box ref={ratingsAndReviewsSectionRef}>
          <S.Spacer />
          <S.Title>RATINGS &#38; REVIEWS</S.Title>
          <S.Content>
            <RatingsAndReviews productId={productId} />
          </S.Content>
        </Box>
      )}
    </Box>
  );
};

/*
return (
    <S.Wrapper>
      <S.Tabs>
        <S.TabTitle
          active={activeTab === TABS.DESCRIPTION}
          onMouseEnter={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.DESCRIPTION);
          }}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.DESCRIPTION);
          }}
        >
          DESCRIPTION
        </S.TabTitle>
        <S.TabTitle
          active={activeTab === TABS.ATTRIBUTES}
          onMouseEnter={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.ATTRIBUTES);
          }}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.ATTRIBUTES);
          }}
        >
          ATTRIBUTES
        </S.TabTitle>
      </S.Tabs>
      {activeTab === TABS.DESCRIPTION &&
        (descriptionJson ? (
          <RichTextContent descriptionJson={descriptionJson} />
        ) : (
          <p>{description}</p>
        ))}
      {activeTab === TABS.ATTRIBUTES && (
        <S.AttributeList>
          {attributes &&
            attributes.map((attribute, index) => (
              <li key={index}>
                <S.AttributeName>{attribute.attribute.name}: </S.AttributeName>{" "}
                {attribute.values.map(value => value.name).join(", ")}
              </li>
            ))}
        </S.AttributeList>
      )}
    </S.Wrapper>
  );
  */
