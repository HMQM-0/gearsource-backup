import React from "react";

export function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => localStorage.getItem(key) || defaultValue
  );
  React.useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}
