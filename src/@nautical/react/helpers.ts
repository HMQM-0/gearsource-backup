import React from "react";

import { NauticalAPI } from "../api";
import { NauticalContext } from "./context";

export function useNauticalClient(): NauticalAPI {
  const nautical = React.useContext(NauticalContext);

  if (!nautical) {
    throw new Error(
      "Could not find nautical's apollo client in the context. " +
        "Did you forget to wrap the root component in a <NauticalProvider>?"
    );
  }

  return nautical;
}
