import { FETCH_URL_PATH } from "../constants";
import type { Machine, Status } from "../types/machine";

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

export const changeStatus = async (status: Status, id: number) => {
  const response = await fetch(`${FETCH_URL_PATH}/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: status }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Couldn't change machine's ${id} status.`);
  }
};
