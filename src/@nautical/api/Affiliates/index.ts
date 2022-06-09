import { ApolloClient } from "@apollo/client";
// import { JobsManager } from "src/jobs";
import { JobsManager } from "../../jobs";
import { PromiseRunResponse } from "../types";
import { DataErrorAffiliateTypes } from "./types";

export class AffiliatesAPI {
  client: ApolloClient<any>;

  private jobsManager: JobsManager;

  constructor(client: ApolloClient<any>, jobsManager: JobsManager) {
    this.client = client;
    this.jobsManager = jobsManager;
  }

  useAffiliateCode = async (
    code: string
  ): PromiseRunResponse<DataErrorAffiliateTypes> => {
    const { data, dataError } = await this.jobsManager.run(
      "affiliates",
      "useAffiliateCode",
      {
        code,
      }
    );

    if (dataError) {
      return {
        data,
        dataError,
        pending: false,
      };
    }

    return data;
  };
}
