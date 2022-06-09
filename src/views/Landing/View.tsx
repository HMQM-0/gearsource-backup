import "./scss/index.scss";

import * as React from "react";
import { Box } from "@mui/material";
import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";
// import StorePage from "../Builder/StorePage";

const View: React.FC = () => (
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
            {/* {<StorePage landing={data.shop} />} */}
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
          </MetaWrapper>
        );
      }}
    </TypedHomePageQuery>
  </Box>
);

export default View;
