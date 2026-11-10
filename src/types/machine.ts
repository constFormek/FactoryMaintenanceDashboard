export type Status = "Running" | "Maintenance" | "Stopped";

export interface Machine {
  id: number;
  name: string;
  location: string;
  status: Status;
}