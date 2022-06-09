import { ApolloClientManager } from "../../data/ApolloClientManager";
// import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { DataErrorAffiliateTypes } from "../../api/Affiliates/types";

import { JobRunResponse } from "../types";
import { JobsHandler } from "../JobsHandler";

export enum AffiliateJobsEvents {
  AFFILIATE_CODE_USED,
}
export interface AffiliateJobsEventsValues {
  [AffiliateJobsEvents.AFFILIATE_CODE_USED]: boolean;
}

export type PromiseAffiliateJobRunResponse = Promise<
  JobRunResponse<DataErrorAffiliateTypes>
>;

export class AffiliateJobs extends JobsHandler<AffiliateJobsEventsValues> {
  private apolloClientManager: ApolloClientManager;

  // private localStorageHandler: LocalStorageHandler;

  constructor(
    // localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.apolloClientManager = apolloClientManager;
    // this.localStorageHandler = localStorageHandler;
  }

  useAffiliateCode = async ({
    code,
  }: {
    code: string;
  }): PromiseAffiliateJobRunResponse => {
    const { data, error } = await this.apolloClientManager.useAffiliateCode(
      code
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAffiliateTypes.USE_AFFILIATE_CODE,
        },
      };
    }

    return {
      data,
    };
  };
}
