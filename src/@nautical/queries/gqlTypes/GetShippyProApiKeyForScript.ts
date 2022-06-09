export interface GetShippyProApiKeyForScript {
  /**
   * Return information about the ShippyPro App active state and API Key.
   */
  shippyProApiKeyForScript: {
    active: boolean;
    apiKey: string;
  };
}
