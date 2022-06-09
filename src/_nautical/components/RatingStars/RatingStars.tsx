import * as React from "react";
import { useProductRatingsAndReviews } from "@temp/@nautical/react/queries";
import Rating from "@mui/material/Rating";
import "./scss/index.scss";

interface IRatingStarsProps {
  productId: string;
  scrollToRatingsAndReviewsSection: () => void;
}

const RatingStars: React.FC<IRatingStarsProps> = (props) => {
  const { productId, scrollToRatingsAndReviewsSection } = props;
  const { data } = useProductRatingsAndReviews(
    { productId },
    { fetchPolicy: "network-only" }
  );

  const [stars, setStars] = React.useState(null);
  const [totalReviews, setTotalReviews] = React.useState(null);

  React.useEffect(() => {
    const reviewsSummary = data?.productRatingsAndReviews?.bottomline;
    setStars(reviewsSummary?.averageScore);
    setTotalReviews(reviewsSummary?.totalReview);
  }, [data]);

  return (
    <div
      className="rating-stars-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginRight: "100px",
      }}
      onClick={scrollToRatingsAndReviewsSection}
    >
      <Rating name="read-only" value={stars} readOnly />
      <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
        {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
      </span>
    </div>
  );
};

export default RatingStars;
