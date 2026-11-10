import { FETCH_URL_PATH } from "../constants";
import type { Machine } from "../types/machine";

export const getMachines = async (signal: AbortSignal) => {

  const response = await fetch(FETCH_URL_PATH, {
    signal: signal,
  });
  if (!response.ok) {
    throw new Error(`Couldn't load machines (error ${response.status})`);
  }

  const results: Machine[] = await response.json();
  return results;
};

