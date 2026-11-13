import { useEffect, useRef, useState } from "react";
import MachineTable from "./MachineTable";
import type { Machine, Status } from "../types/machine";
import { changeStatus, getMachines } from "../api/requests";

const Container = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const controllerRef = useRef<AbortController | null>(null);

  const updateStatus = async (status: Status, id: number) => {
    try {
      setMachines((prev) => {
        const updatedMachines = prev.map((m) => {
          return m.id === id ? { ...m, status: status } : m;
        });
        console.log(updatedMachines, "uM");
        return updatedMachines;
      });

      const results = await changeStatus(status, id);

      console.log(results, "status");
      console.log(machines, "nUm");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Something went wrong");
    }
  };
  const loadMachines = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const results = await getMachines(controller.signal);
      setError("");
      setMachines(results);
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error instanceof Error) setError(error.message);
      else setError("Something went wrong");
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  };

  useEffect(() => {
    // setState in fetchData only runs after an await, not synchronously in the effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMachines();

    return () => {
      if (!controllerRef.current) return;
      controllerRef.current.abort();
    };
  }, []);

  if (isLoading && machines.length === 0) return <div>Loading....</div>;

  if (error && machines.length === 0) return <div>{error}</div>;

  if (machines.length === 0) return <div>no machines to show</div>;

  return (
    <div className="flex  flex-col w-full my-20 space-y-6">
      <div className="items-center flex justify-between">
        <div className="flex flex-col space-y-1 ">
          <h1 className="text-4xl bricolage-grotesque-bold tracking-wide ">
            Machines Table
          </h1>
          <p className="text-muted text-sm tracking-wide bricolage-grotesque-regular">
            Display, filter and edit machines data{" "}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-accent text-background cursor-pointer hover:bg-accent/80  hover:text-foreground transition-colors rounded-full px-3 py-2 ">
            + New machine
          </button>

          <button
            onClick={() => {
              setIsLoading(true);
              loadMachines();
            }}
            className={`${isLoading ? "animate-spin text-accent/90 pointer-events-none" : "hover:text-accent/90 hover:rotate-90"} focus:rotate-90 transition-all  cursor-pointer px-2 py-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-refresh-cw preview-icon"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <button role="alert" onClick={() => setError("")}>
          <span>{error}</span> *Click to remove*
        </button>
      )}

      <div className="flex flex-col space-y-2 ">
        <MachineTable machines={machines} updateStatus={updateStatus} />
        <span className="text-sm self-end text-muted bricolage-grotesque-regular">
          Displaying {machines.length}/{machines.length} of total machines
        </span>
      </div>
    </div>
  );
};

export default Container;
