import React, { useState } from "react";
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useAuth,
} from "@nautical/react";
import { WishlistContext } from "@nautical/react/components/WishlistProvider/context";

import { IProps } from "./types";
import { AddToWishlistButton } from "@components/molecules/AddToWishlistButton";
import { useAlert } from "react-alert";
import { useIntl } from "react-intl";

import { userWishlist } from "@nautical/queries/wishlist";
import { CircularProgress } from "@mui/material";

export const AddToWishlist: React.FC<IProps> = ({
  productId,
  showButtonText = true,
}: IProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  // const { wishlist, update } = React.useContext(WishlistContext);
  const { wishlist } = React.useContext(WishlistContext);
  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();

  const isAddedToWishlist = () => {
    return (
      !!wishlist && wishlist.some(({ product }) => product.id === productId)
    );
  };

  const [addedToWishlist, setAddedToWishlist] = React.useState(
    isAddedToWishlist()
  );
  React.useEffect(() => {
    const added = isAddedToWishlist();
    if (added !== addedToWishlist) {
      setAddedToWishlist(added);
    }
  }, [wishlist]);
  const [
    addWishlistProduct,
    // { loading: addLoading, error: addError },
  ] = useAddWishlistProduct({ productId });
  const [
    removeWishlistProduct,
    // { loading: errorLoading, error: removeError },
  ] = useRemoveWishlistProduct({ productId });

  const addOrRemoveFromWishlist = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      alert.show(
        {
          content: `Please log in to add the product to your wishlist`,
          title: intl.formatMessage({
            defaultMessage: "Login required",
          }),
        },
        {
          timeout: 7500,
          type: "error",
        }
      );
      return;
    }
    setIsProcessing(true);
    if (addedToWishlist) {
      const removeResult = await removeWishlistProduct(
        { productId },
        {
          refetchQueries: [
            userWishlist, // DocumentNode object parsed with gql
            "Wishlist", // Query name
          ],
        }
      );

      if (removeResult?.data?.errors?.length === 0) {
        alert.show(
          {
            content: `Removed product from your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Product removed",
            }),
          },
          {
            timeout: 7500,
            type: "success",
          }
        );
      } else {
        alert.show(
          {
            content: `Failed to remove product from your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Something went wrong",
            }),
          },
          {
            timeout: 7500,
            type: "error",
          }
        );
      }
    } else {
      const addResult = await addWishlistProduct(
        { productId },
        {
          refetchQueries: [
            userWishlist, // DocumentNode object parsed with gql
            "Wishlist", // Query name
          ],
        }
      );
      if (addResult?.data?.errors?.length === 0) {
        alert.show(
          {
            content: `Added product to your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Product added",
            }),
          },
          {
            timeout: 7500,
            type: "success",
          }
        );
      } else {
        alert.show(
          {
            content: `Failed to add product to your wishlist`,
            title: intl.formatMessage({
              defaultMessage: "Something went wrong",
            }),
          },
          {
            timeout: 7500,
            type: "error",
          }
        );
      }
    }
    setIsProcessing(false);
  };

  if (isProcessing) {
    return <CircularProgress />;
  }

  return (
    <AddToWishlistButton
      added={addedToWishlist}
      onClick={addOrRemoveFromWishlist}
      showText={showButtonText}
    />
  );
};
