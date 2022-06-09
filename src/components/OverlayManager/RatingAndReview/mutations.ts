import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  SubmitRatingAndReview,
  SubmitRatingAndReviewVariables,
} from "./gqlTypes/SubmitRatingAndReview";

const submitRatingAndReviewMutation = gql`
  mutation SubmitRatingAndReview(
    $headline: String!
    $review: String!
    $publicName: String!
    $rating: String!
    $productId: String!
    $emailAddress: String!
  ) {
    submitRatingAndReview(
      headline: $headline
      review: $review
      publicName: $publicName
      rating: $rating
      productId: $productId
      emailAddress: $emailAddress
    ) {
      errors {
        field
        message
      }
      submissionSuccessful
    }
  }
`;

export const TypedRatingAndReviewMutation = TypedMutation<
  SubmitRatingAndReview,
  SubmitRatingAndReviewVariables
>(submitRatingAndReviewMutation);
