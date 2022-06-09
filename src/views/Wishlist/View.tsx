// import "./scss/index.scss";

import * as React from "react";
import { WishlistContext } from "@temp/@nautical/react/components/WishlistProvider/context";

// import { useHistory } from "react-router-dom";
import { Wishlist } from "@components/templates";
import StorePage from "../Builder/StorePage";
import { ShopContext } from "@temp/components/ShopProvider/context";

const View: React.FC = () => {
  const { wishlist } = React.useContext(WishlistContext);
  const { builderKey } = React.useContext(ShopContext);

  return builderKey ? (
    <StorePage wishlist={wishlist} />
  ) : (
    <Wishlist wishlist={wishlist} />
  );
};

export default View;
