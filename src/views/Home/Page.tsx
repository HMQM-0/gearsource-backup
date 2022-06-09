import "./scss/index.scss";

// import clsx from "clsx";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ProductsFeatured } from "../../components";
import {
  // generateCategoryUrl,
  generateProductsUrl,
  maybe,
} from "../../core/utils";

import {
  ProductsList_categories,
  // ProductsList_collections,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

// import { StringParam, useQueryParam } from 'use-query-params';
// import noPhotoImg from "../../images/no-photo.svg";
import { homeCollectionData } from "./functions/homeCollectionData";
import CategoryBlock from "@temp/_nautical/components/CategoryBlock";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  const intl = useIntl();

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <Box
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
        <Box className="home-page__hero-text">
          <Box>
            <Box component="span" className="home-page__hero__title">
              <Box className="home-page__hero__title__block">
                <Box className="home-page__hero__title__leftline" />
                <Typography variant="h1">
                  {maybe(() => homeCollectionData(shop.homepageCollection))}
                </Typography>
                <Box className="home-page__hero__title__rightline" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="home-page__hero-action">
          <Link to={generateProductsUrl()}>
            <Button color="secondary" variant="contained">
              Explore Products
            </Button>
          </Link>
        </Box>
      </Box>

      <ProductsFeatured
        title={intl.formatMessage({ defaultMessage: "Featured Products" })}
        caption="New, trending, and on-sale this month"
      />
      {categoriesExist() && (
        <Box className="home-page__categories">
          <Box className="container">
            <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
              <FormattedMessage defaultMessage="Shop by category" />
            </Typography>
            <Box className="caption">
              Check out the hottest categories on the move now
            </Box>

            <Box className="home-page-category-blocks">
              {categories.edges.map(({ node: category }) => (
                <CategoryBlock key={category.id} category={category} />
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* collectionsExist() && (
        <Box className="home-page__categories">
          <Box className="container">
            <Typography>
              <FormattedMessage defaultMessage="Shop our collections" />
            </Typography>
            <caption>
              Check out the hottest collections on the move now
            </caption>

            <Box className="home-page-collection-blocks">
            {collections.edges.map(({ node: collection }) => (
                <CollectionBlock collection={collection} />
              ))}
            </Box>

            
          </Box>
        </Box>
            ) */}
    </>
  );
};

export default Page;

/*

{loading ? (
          <Button testingContext="allProductsButton">
            Explore Products
          </Button>
        ) : (
          <>
          </>
          )}

<Box className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <Button>Shop sale</Button>
              </Link>
            )
          )}
        </Box>
*/

/*

        <Box className="home-page__categories">
          <Box className="container">
            <Typography>
              <FormattedMessage defaultMessage="Shop by category" />
            </Typography>
            <Box className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <Box key={category.id}>
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <Box
                      className={clsx(
                        "home-page__categories__list__image",
                        {
                          "home-page__categories__list__image--no-photo": !category.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          category.backgroundImage
                            ? category.backgroundImage.url
                            : noPhotoImg
                        })`,
                      }}
                    />
                    <Typography>{category.name}</Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      */
