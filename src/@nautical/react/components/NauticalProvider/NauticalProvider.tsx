import React, { useState, useEffect } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";

import { NauticalManager } from "../../..";
import { NauticalAPI } from "../../../api";
import { NauticalContext } from "../../context";

import { IProps } from "./types";

const NauticalProvider: React.FC<IProps> = ({
  apolloConfig,
  config,
  children,
}: IProps) => {
  const [context, setContext] = useState<NauticalAPI | null>(null);
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  const getNauticalApiAndClient = async (manager: NauticalManager) => {
    const { api, apolloClient } = await manager.connect((nauticalAPI) => {
      if (nauticalAPI) {
        setContext({ ...nauticalAPI });
      }
    });

    setContext({ ...api });
    setClient(apolloClient);
  };

  useEffect(() => {
    const manager = new NauticalManager(config, apolloConfig);

    getNauticalApiAndClient(manager);
  }, []);

  if (client && context) {
    return (
      <NauticalContext.Provider value={context}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </NauticalContext.Provider>
    );
  }
  return null;
};

NauticalProvider.displayName = "NauticalProvider";
export { NauticalProvider };
