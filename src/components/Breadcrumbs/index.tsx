import classNames from "clsx";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { Link } from "react-router-dom";
import { commonMessages } from "@temp/intl";
import { Box } from "@mui/material";
import { baseUrl } from "../../app/routes";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/gqlTypes/Category";
import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

export interface Breadcrumb {
  value: string;
  link: string;
}

export const extractBreadcrumbs = (category: Category_category) => {
  const constructLink = (item) => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map((edge) =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
  <Media
    query={{
      minWidth: smallScreen,
    }}
  >
    {(matches) =>
      matches ? (
        <ul className="breadcrumbs">
          <li>
            <Link to={baseUrl}>
              <FormattedMessage {...commonMessages.home} />
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.value}
              className={classNames({
                breadcrumbs__active: index === breadcrumbs.length - 1,
              })}
            >
              <Link to={breadcrumb.link}>{breadcrumb.value}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <Box className="breadcrumbs">
          <Link to={getBackLink(breadcrumbs)}>
            <FormattedMessage defaultMessage="Back" />
          </Link>
        </Box>
      )
    }
  </Media>
);

export default Breadcrumbs;
