/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterAccount
// ====================================================

export interface SubmitRatingAndReview_submissionSuccess_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface SubmitRatingAndReview_submissionSuccess {
  __typename: "AccountRegister";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: SubmitRatingAndReview_submissionSuccess_errors[];
  /**
   * Informs whether submission of rating and review successful.
   */
  submissionSuccessful: boolean | null;
}

export interface SubmitRatingAndReview {
  /**
   * Sends a rating and review for submission.
   */
  submitRatingAndReview: SubmitRatingAndReview_submissionSuccess | null;
}

export interface SubmitRatingAndReviewVariables {
  headline: string;
  review: string;
  publicName: string;
  rating: number;
  productId: string;
  emailAddress: string;
}
