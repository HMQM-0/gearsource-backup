import "./scss/index.scss";

import * as React from "react";
// import { RouteComponentProps } from "react-router-dom";
import { MetaWrapper, NotFound } from "../../components";
import { STATIC_PAGES } from "../../core/config";
import { generatePageUrl, maybe } from "../../core/utils";
import { Article_shop } from "./gqlTypes/Article";
import Page from "./Page";
import { TypedArticleQuery } from "./query";
import { useParams } from "react-router";
import BuilderPage from "./BuilderPage";

const canDisplay = (page) =>
  maybe(() => !!page && !!page.title && !!page.contentJson);
const getHeaderImage = (shop: Article_shop) =>
  maybe(() => shop.homepageCollection.backgroundImage.url);

// type ViewProps = RouteComponentProps<{ slug: string }>;

// export const View: React.FC<ViewProps> = ({
export const View: React.FC<any> = () => {
  const params = useParams();
  return (
    <TypedArticleQuery
      loaderFull
      variables={{ slug: params.slug }}
      errorPolicy="all"
    >
      {({ data }) => {
        const navigation = STATIC_PAGES.map((page) => ({
          ...page,
          active: page.url === window.location.pathname,
        }));
        const { page, shop } = data;

        if (canDisplay(page)) {
          const breadcrumbs = [
            {
              link: generatePageUrl(params.slug),
              value: page.title,
            },
          ];
          return (
            <MetaWrapper
              meta={{
                description: page.seoDescription,
                title: page.seoTitle,
              }}
            >
              <Page
                breadcrumbs={breadcrumbs}
                headerImage={getHeaderImage(shop)}
                navigation={navigation}
                page={data.page}
              />
              <BuilderPage
                breadcrumbs={breadcrumbs}
                headerImage={getHeaderImage(shop)}
                page={data.page}
              />
            </MetaWrapper>
          );
        }

        if (page === null) {
          return <NotFound />;
        }
      }}
    </TypedArticleQuery>
  );
};
export default View;
