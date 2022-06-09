import React from "react";
import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

// STYLING
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerRatingContainer: {
      height: "30px",
    },
    innerRatingContainer: {
      display: "flex",
    },
    barsContainer: {
      position: "relative",
    },
    backgroundBar: {
      height: "20px",
      width: "147px",
      backgroundColor: "#F0F0F0",
      border: "1px solid #B2B2B2",
      borderRadius: "1px",
      margin: "0px 10px 10px 10px",
      boxShadow: "2px 2px 3px #00000026",
    },
    ratingBar: {
      height: "20px",
      backgroundColor: "#0082a0",
      border: "1px solid #006C85",
      borderRadius: "1px",
      margin: "0px 10px 10px 10px",
      position: "absolute",
      zIndex: 1,
      transform: "translateY(-150%)",
    },
  })
);

// HELPER FUNCTIONS
const formatFloatToPercentage = (float) => {
  return `${(float * 100).toFixed()}%`;
};

const getRatingPercentage = (data, targetRating) => {
  return (
    data?.reviews.filter((review) => review.score === targetRating).length /
      data?.bottomline?.totalReview || 0
  );
};

const getRatingPercentages = (data) => {
  const fiveStars = getRatingPercentage(data, 5);
  const fourStars = getRatingPercentage(data, 4);
  const threeStars = getRatingPercentage(data, 3);
  const twoStars = getRatingPercentage(data, 2);
  const oneStars = getRatingPercentage(data, 1);
  return {
    fiveStars,
    fourStars,
    threeStars,
    twoStars,
    oneStars,
  };
};

export const ReviewBars: React.FC<{ reviewsData: any }> = ({ reviewsData }) => {
  const classes = useStyles();
  const ratingPercentages = getRatingPercentages(reviewsData);

  return (
    <>
      <div className={classes.outerRatingContainer}>
        <div className={classes.innerRatingContainer}>
          <div>5 Stars</div>
          <div className={classes.barsContainer}>
            <div className={classes.backgroundBar}></div>
            {ratingPercentages.fiveStars ? (
              <div
                className={classes.ratingBar}
                style={{ width: `${ratingPercentages.fiveStars * 147}px` }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
          <div>{formatFloatToPercentage(ratingPercentages.fiveStars)}</div>
        </div>
      </div>
      <div className={classes.outerRatingContainer}>
        <div className={classes.innerRatingContainer}>
          <div>4 Stars</div>
          <div className={classes.barsContainer}>
            <div className={classes.backgroundBar}></div>
            {ratingPercentages.fourStars ? (
              <div
                className={classes.ratingBar}
                style={{ width: `${ratingPercentages.fourStars * 147}px` }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
          <div>{formatFloatToPercentage(ratingPercentages.fourStars)}</div>
        </div>
      </div>
      <div className={classes.outerRatingContainer}>
        <div className={classes.innerRatingContainer}>
          <div>3 Stars</div>
          <div className={classes.barsContainer}>
            <div className={classes.backgroundBar}></div>
            {ratingPercentages.threeStars ? (
              <div
                className={classes.ratingBar}
                style={{ width: `${ratingPercentages.threeStars * 147}px` }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
          <div>{formatFloatToPercentage(ratingPercentages.threeStars)}</div>
        </div>
      </div>
      <div className={classes.outerRatingContainer}>
        <div className={classes.innerRatingContainer}>
          <div>2 Stars</div>
          <div className={classes.barsContainer}>
            <div className={classes.backgroundBar}></div>
            {ratingPercentages.twoStars ? (
              <div
                className={classes.ratingBar}
                style={{ width: `${ratingPercentages.twoStars * 147}px` }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
          <div>{formatFloatToPercentage(ratingPercentages.twoStars)}</div>
        </div>
      </div>
      <div className={classes.outerRatingContainer}>
        <div className={classes.innerRatingContainer}>
          <div>1 Star</div>
          <div className={classes.barsContainer} style={{ marginLeft: "9px" }}>
            <div className={classes.backgroundBar}></div>
            {ratingPercentages.oneStars ? (
              <div
                className={classes.ratingBar}
                style={{ width: `${ratingPercentages.oneStars * 147}px` }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
          <div>{formatFloatToPercentage(ratingPercentages.oneStars)}</div>
        </div>
      </div>
    </>
  );
};
