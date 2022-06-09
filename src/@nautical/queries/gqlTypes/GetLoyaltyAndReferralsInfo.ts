/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLoyaltyAndReferralsInfo
// ====================================================

export interface GetLoyaltyAndReferralsInfo {
  /**
   * Return information about the Loyalty & Referrals configuration.
   */
  loyaltyAndReferralsInfo: {
    awardLoyaltyPointsEnabled: boolean;
    pointsForMakingPurchaseEnabled: boolean;
    pointsGainedPerDollarSpent: number;
    pointsUsedPerDollarSaved: number;
  };
}
