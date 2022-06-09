import React from "react";
import {
  useAddWishlistProduct,
  useRemoveWishlistProduct,
  useAuth,
} from "@nautical/react";
import { WishlistContext } from "@nautical/react/components/WishlistProvider/context";
import * as S from "./styles";
import { IProps } from "./types";
import { useAlert } from "react-alert";
import { Icon } from "@components/atoms";
import { useIntl } from "react-intl";

export const AddToCartIconButton: React.FC<IProps> = ({
  productId,
  showButtonText = true,
}: IProps) => {
  const { wishlist, update } = React.useContext(WishlistContext);
  const { user } = useAuth();
  const alert = useAlert();
  const intl = useIntl();
  const [hover, setHover] = React.useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

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

  const addOrRemoveFromWishlist = (event: React.MouseEvent) => {
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
    }
    if (addedToWishlist && user) {
      removeWishlistProduct({ productId });
      update();
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
    } else if (!addedToWishlist && user) {
      addWishlistProduct({ productId });
      update();
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
    }
  };

  return (
    <S.Wrapper
      onClick={addOrRemoveFromWishlist}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* S.WishlistIcon component is reapeted for two icons - it should to prevent flashing css */}
      {hover ? (
        <S.WishlistIcon>
          <Icon name="heart_filled" size={28} />
        </S.WishlistIcon>
      ) : (
        <S.WishlistIcon>
          <Icon name="heart" size={38} />
        </S.WishlistIcon>
      )}
    </S.Wrapper>
  );
};
