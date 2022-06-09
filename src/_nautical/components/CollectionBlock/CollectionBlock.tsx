// import classNames from "clsx";
import * as React from "react";
import { Link } from "react-router-dom";
import noPhotoImg from "@temp/images/no-photo.svg";
import { generateCollectionUrl } from "@temp/core/utils";
import "./scss/index.scss";
import { ProductsList_collections_edges_node } from "@temp/views/Home/gqlTypes/ProductsList";
import { Box } from "@mui/material";
interface ICollectionBlockProps {
  collection: ProductsList_collections_edges_node;
}

const CollectionBlock: React.FC<ICollectionBlockProps> = (props) => {
  const { collection } = props;
  return (
    <Box key={collection.id} className="collection-block-item">
      <Link
        to={generateCollectionUrl(collection.id, collection.name)}
        key={collection.id}
      >
        <Box
          className="collection-block-image"
          style={{
            backgroundImage: `url(${
              collection.backgroundImage
                ? collection.backgroundImage.url
                : noPhotoImg
            })`,
          }}
        >
          <Box className="collection-block-title">{collection.name}</Box>
        </Box>
      </Link>
    </Box>
  );
};

export default CollectionBlock;

/*

*/
