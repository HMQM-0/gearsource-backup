import React from "react";
import CSS from "csstype";
import { Box, IconButton, List, ListItem, Theme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useInView } from "react-intersection-observer";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { CachedImage } from "./CachedImage";

export interface IImage {
  style?: CSS.Properties;
  url?: string;
  url2x?: string;
  alt?: string;
  children?: React.ReactElement;
  defaultImage?: string;
  height?: string;
  width?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  galleryWrapper: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    // display: 'grid',
    // gridTemplateAreas: "sidebar preview",
    height: "100%",
    // gridTemplateColumns: '76px 1fr',
    gap: 8,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  previewContainer: {
    gridArea: "preview",
    width: "auto",
    maxHeight: 560,
    "& img": {
      maxHeight: 560,
      width: "100%",
      objectFit: "contain",
    },
  },
  thumbnail: {
    width: 76,
    display: "flex",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "center",
    height: 100,
    overflow: "hidden",
    "& img": {
      width: "100%",
      objectFit: "contain",
    },
    marginTop: 4,
    marginBottom: 4,
  },
  thumbnailActive: {
    borderColor: theme.palette.divider,
  },
  thumbnailInactive: {
    borderColor: "transparent",
  },
  thumbnailButton: {
    height: 50,
    width: "100%",
    position: "absolute",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  thumbnailsContainer: {
    position: "relative",
  },
  thumbnailList: {
    position: "absolute",
    display: "block",
    padding: 0,
    margin: 0,
  },
  thumbnailListWrapper: {
    // position: 'relative',
    height: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      width: 0,
    },
  },
  thumbnailWrapper: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
      flexDirection: "row",
      gap: 8,
    },
  },
}));

interface IProductGalleryProps {
  images: IImage[];
}

const MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS = 4;

const ProductGallery: React.FunctionComponent<IProductGalleryProps> = (
  props
) => {
  const { images } = props;
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  const classes = useStyles();
  const displayButtons = images.length > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS;

  React.useEffect(() => {
    if (imageIndex >= images.length) {
      setImageIndex(0);
    }
  }, [images]);

  const bottomImageRef = React.useRef<HTMLDivElement | null>(null);
  const topImageRef = React.useRef<HTMLDivElement | null>(null);
  const [topImageIntersectionObserver, topImageInView] = useInView({
    threshold: 0.5,
  });

  const [bottomImageIntersectionObserver, bottomImageInView] = useInView({
    threshold: 0.5,
  });

  const setBottomRef = React.useCallback(
    (node) => {
      bottomImageRef.current = node;
      bottomImageIntersectionObserver(node);
    },
    [bottomImageIntersectionObserver]
  );

  const setTopRef = React.useCallback(
    (node) => {
      topImageRef.current = node;
      topImageIntersectionObserver(node);
    },
    [topImageIntersectionObserver]
  );

  const setIntersectionObserver = (index: number, lengthOfArray: number) => {
    if (lengthOfArray > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS) {
      if (index === 0) {
        return setTopRef;
      }
      if (index === lengthOfArray - 1) {
        return setBottomRef;
      }
    }
  };
  return (
    <>
      <Box className={classes.galleryWrapper}>
        <Box className={classes.thumbnailWrapper}>
          {images &&
            images.length > 0 &&
            images.map((image, index) => {
              return (
                <Box
                  key={index}
                  className={clsx(
                    classes.thumbnail,
                    Boolean(index === imageIndex)
                      ? classes.thumbnailActive
                      : classes.thumbnailInactive
                  )}
                  ref={setIntersectionObserver(index, images.length)}
                  onClick={() => setImageIndex(index)}
                  onMouseEnter={() => setImageIndex(index)}
                >
                  <CachedImage alt={image.alt} url={image.url} />
                </Box>
              );
            })}
        </Box>
        <Box className={classes.previewContainer}>
          {images && images.length > 0 && imageIndex < images.length && (
            <CachedImage
              alt={images[imageIndex].alt}
              url={images[imageIndex].url}
            />
          )}
          {images.length === 0 && <CachedImage />}
        </Box>
      </Box>
      {/*  THIS IS THE OLD CODE */}
      <Box className={classes.galleryWrapper} style={{ display: "none" }}>
        <Box className={classes.thumbnailsContainer}>
          {!topImageInView && displayButtons && (
            <IconButton
              className={classes.thumbnailButton}
              sx={{ top: "0%" }}
              onClick={() => {
                if (topImageRef.current) {
                  topImageRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          )}
          {!bottomImageInView && displayButtons && (
            <IconButton
              className={classes.thumbnailButton}
              sx={{ bottom: "0%" }}
              onClick={() => {
                if (bottomImageRef.current) {
                  bottomImageRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
          <Box className={classes.thumbnailListWrapper}>
            <List className={classes.thumbnailList}>
              {images &&
                images.length > 0 &&
                images.map((image, index) => {
                  return (
                    <ListItem
                      key={index}
                      data-test="galleryThumbnail"
                      data-test-id={index}
                    >
                      <Box
                        className={clsx(
                          classes.thumbnail,
                          Boolean(index === imageIndex)
                            ? classes.thumbnailActive
                            : classes.thumbnailInactive
                        )}
                        ref={setIntersectionObserver(index, images.length)}
                        onClick={() => setImageIndex(index)}
                        onMouseEnter={() => setImageIndex(index)}
                      >
                        <CachedImage alt={image.alt} url={image.url} />
                      </Box>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
        </Box>
        <Box className={classes.previewContainer}>
          {images && images.length > 0 && imageIndex < images.length && (
            <CachedImage
              alt={images[imageIndex].alt}
              url={images[imageIndex].url}
            />
          )}
          {images.length === 0 && <CachedImage />}
        </Box>
      </Box>
    </>
  );
};

export default ProductGallery;
