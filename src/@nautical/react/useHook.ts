import { NauticalAPI } from "../api";
import { useNauticalClient } from "./helpers";

const useHook = <T extends keyof NauticalAPI>(dataName: T): NauticalAPI[T] => {
  const nautical = useNauticalClient();

  const getHookData = () => {
    return nautical[dataName];
  };

  return getHookData();
};

export const hookFactory =
  <T extends keyof NauticalAPI>(query: T) =>
  () =>
    useHook(query);
