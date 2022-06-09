import "./scss/index.scss";

import * as React from "react";
import { Box } from "@mui/material";
import { MetaWrapper } from "../../components";
import Page from "./Page";
import { builderHomePageQuery, TypedHomePageQuery } from "./queries";
import StorePage from "../Builder/StorePage";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { useQuery } from "@apollo/client";

const View: React.FC = () => {
  const { builderKey } = React.useContext(ShopContext);

  const { data: builderLandingData } = useQuery(builderHomePageQuery);

  return (
    <Box className="home-page">
      <TypedHomePageQuery /* alwaysRender displayLoader={false} errorPolicy="all" */
      >
        {({ data, loading }) => {
          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              {builderKey ? (
                <StorePage landing={builderLandingData} />
              ) : (
                <Page
                  loading={loading}
                  backgroundImage={
                    data.shop &&
                    data.shop.homepageCollection &&
                    data.shop.homepageCollection.backgroundImage
                  }
                  categories={data.categories}
                  // collections={data.collections}
                  shop={data.shop}
                />
              )}
            </MetaWrapper>
          );
        }}
      </TypedHomePageQuery>
    </Box>
  );
};

export default View;
