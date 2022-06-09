import React from "react";

import { IProps } from "./types";
import WishlistCard from "../WishlistCard";
import { Box, Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import heartImg from "images/heart.svg";
import { useAuth } from "@nautical/react";
import {
  OverlayContext,
  OverlayType,
  OverlayTheme,
} from "../../../../components/Overlay";
// import {
//   generateMicrositeUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "@temp/core/utils";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    },
    title: {
      paddingLeft: "16px",
      paddingTop: "16px",
      marginBottom: "32px",
      fontWeight: 700,
    },
    emptyContainer: {
      display: "flex",
      flex: "1 1 0%",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "3rem",
      paddingRight: "3rem",
      paddingTop: "6rem",
      paddingBottom: "6rem",
      alignItems: "center",
    },
    heartWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "4rem",
      height: "4rem",
      padding: "3rem",
      borderRadius: "0.5rem",
      border: "1px dashed black",
    },
    heartIcon: {
      position: "absolute",
    },
    emptyMessage: {
      paddingTop: "1.5rem",
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 700,
      letterSpacing: "0.025em",
      textAlign: "center",
    },
    clickMessage: {
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
      textAlign: "center",
      paddingTop: "0.5rem",
      color: "blue",
      cursor: "pointer",
    },
  })
);

export const WishlistTable: React.FC<IProps> = ({ wishlist }: IProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <OverlayContext.Consumer>
      {(overlayContext) => (
        <Box className={classes.container}>
          <h3 className={classes.title}>My Wishlist</h3>
          {wishlist &&
            user &&
            wishlist.length >= 1 &&
            wishlist?.map((item) => {
              return <WishlistCard key={item.id} item={item} />;
            })}
          {!user && (
            <Box className={classes.emptyContainer}>
              <Box component="span" className={classes.heartWrapper}>
                <img src={heartImg} className={classes.heartIcon} />
              </Box>
              <h2 className={classes.emptyMessage}>Your wishlist is empty</h2>
              <p
                className={classes.clickMessage}
                onClick={() =>
                  overlayContext.show(OverlayType.login, OverlayTheme.right)
                }
              >
                <a>Sign in to start adding products to your wishlist</a>
              </p>
            </Box>
          )}
          {(!wishlist || wishlist.length === 0) && user && (
            <Box className={classes.emptyContainer}>
              <Box component="span" className={classes.heartWrapper}>
                <img src={heartImg} className={classes.heartIcon} />
              </Box>
              <h2 className={classes.emptyMessage}>Your wishlist is empty</h2>
              <p
                className={classes.clickMessage}
                onClick={() =>
                  navigate(
                    // !!isMicrosite()
                    //   ? generateMicrositeUrl(
                    //       getMicrositeId(),
                    //       getMicrositeSlug()
                    //     )
                    //   : "/products/"
                    "/products/"
                  )
                }
              >
                <a>Browse to start adding products to your wishlist</a>
              </p>
            </Box>
          )}
        </Box>
      )}
    </OverlayContext.Consumer>
  );
};
