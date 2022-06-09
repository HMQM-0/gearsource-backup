// import classNames from "clsx";
import * as React from "react";
import { Link } from "react-router-dom";
import noPhotoImg from "@temp/images/no-photo.svg";
import { generateCategoryUrl } from "@temp/core/utils";
import "./scss/index.scss";
import { ProductsList_categories_edges_node } from "@temp/views/Home/gqlTypes/ProductsList";
import { Box } from "@mui/material";
interface ICategoryBlockProps {
  category: ProductsList_categories_edges_node;
}

const CategoryBlock: React.FC<ICategoryBlockProps> = (props) => {
  const { category } = props;
  return (
    <Box key={category.id} className="category-block-item">
      <Link
        to={generateCategoryUrl(category.id, category.name)}
        key={category.id}
      >
        <Box
          className="category-block-image"
          style={{
            backgroundImage: `url(${
              category.backgroundImage
                ? category.backgroundImage.url
                : noPhotoImg
            })`,
          }}
        >
          <Box className="category-block-title">{category.name}</Box>
        </Box>
      </Link>
    </Box>
  );
};

export default CategoryBlock;

/*

*/
