// import clsx from "clsx";
import * as React from "react";
// import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { RichTextContent } from "@components/atoms";
import { Breadcrumb, Breadcrumbs } from "../../components";

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface PageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation: PageNavigationElement[];
  page: {
    contentJson: any;
    title: string;
  };
}
export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  headerImage,
  navigation,
  page,
}) => (
  <Box className="article-page">
    <Box
      className="article-page__header"
      style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
    >
      <Box className="article-page__header__title">
        <Typography variant="h1">{page.title}</Typography>
      </Box>
    </Box>
    <Box className="container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box className="article-page__container">
        {/* <Box className="article-page__navigation">
          <ul>
            {navigation.map((menuElement) => (
              <li
                className={clsx({
                  "article-page__navigation-element": true,
                  "article-page__navigation-element--active":
                    menuElement.active,
                })}
                key={menuElement.url}
              >
                <Link to={menuElement.url}>{menuElement.label}</Link>
              </li>
            ))}
          </ul>
        </Box> */}
        <Box className="article-page__content">
          <RichTextContent descriptionJson={page.contentJson} />
        </Box>
      </Box>
    </Box>
  </Box>
);
export default Page;
