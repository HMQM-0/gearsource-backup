import { AffiliateErrorCode } from "./../../gqlTypes/globalTypes";
import { AccountUpdate_accountUpdate_user } from "./AccountUpdate";

export interface AffiliateCode_errors {
  /**
   * The error code.
   */
  code: AffiliateErrorCode;
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

export interface AffiliateCodes_node {
  id: string;
  code: string;
  affiliate: AccountUpdate_accountUpdate_user;
  isActive: boolean;
  uses: number;
  channel: string;
}

export interface AffiliateCodeUse {
  affiliateCodeUse: {
    affiliateCodes: AffiliateCodes_node;
    errors: AffiliateCode_errors[];
  };
}

export interface AffiliateCodeUseVariables {
  code: string;
}
