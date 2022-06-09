import "../Category/scss/index.scss";

import * as React from "react";
import { Box } from "@mui/material";
// import { useIntl } from "react-intl";

// import { commonMessages } from "@temp/intl";
import { IFilterAttributes, IFilters } from "@types";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductList } from "../../@next/components/organisms";
// import { Breadcrumbs, ProductsFeatured } from "../../components";
import { maybe } from "../../core/utils";

// import { ProductSideNavbar } from "@temp/_nautical/components/ProductSideNavbar/ProductSideNavbar";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { Menu } from "../Products/gqlTypes/Products";
import { Microsite_microsite } from "./gqlTypes/Microsite";
import { MicrositeProducts_microsite_products } from "./gqlTypes/MicrositeProducts";
import ProductListBanner from "@temp/_nautical/components/ProductListBanner/ProductListBanner";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  microsite: Microsite_microsite;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  menu: Menu;
  products: MicrositeProducts_microsite_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  microsite,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  menu,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  // const intl = useIntl();
  // const [showDirectory, setShowDirectory] = React.useState(false);

  /* const breadcrumbs = [
    {
      link: [
        `/site`,
        `/${microsite.slug}`,
        `/${getDBIdFromGraphqlId(microsite.id, "Microsite")}/`,
      ].join(""),
      value: microsite.name,
    },
  ]; */

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map((valueSlug) =>
            getAttribute(key, valueSlug)
          )
        ),
      []
    );

  return (
    <Box className="microsite">
      <Box className="container">
        {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
        {/* <ProductSideNavbar
          show={showDirectory}
          onHide={() => setShowDirectory(false)}
          items={menu?.items}
        /> */}
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        <ProductListBanner
          disable={microsite.bannerImage ? false : true}
          image={maybe(() => microsite.bannerImage.url, "")}
        />
        <ProductListHeader
          activeSortOption={activeSortOption}
          // openDirectoryMenu={() => setShowDirectory(true)}
          openDirectoryMenu={undefined}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />
        {canDisplayProducts && (
          <ProductList
            products={products.edges.map((edge) => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        )}
      </Box>

      {/* !hasProducts && (
        <ProductsFeatured
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      ) */}
    </Box>
  );
};

export default Page;
