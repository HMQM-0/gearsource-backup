/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShop
// ====================================================

export interface GetProductRatingsAndReviews {
  /**
   * Return ratings and reviews for product.
   */
  productRatingsAndReviews: {
    bottomline: {
      averageScore: string;
      totalReview: number;
    };
    reviews: Array<{
      content: string;
      createdAt: string;
      score: number;
      title: string;
      user: {
        displayName: string;
        socialImage: string;
      };
    }>;
  };
}
