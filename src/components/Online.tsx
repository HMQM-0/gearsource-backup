import * as React from "react";

import { NetworkStatus } from ".";

const Online: React.FC = ({ children }) => (
  // @ts-ignore
  <NetworkStatus>{(online) => (online ? children : null)}</NetworkStatus>
);

export default Online;
