import { useEffect, useRef, useState } from "react";
import "./App.css";
import MachineTable from "./components/MachineTable";
import type { Machine } from "./types/machine";
import { getMachines } from "./api/requests";

function App() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const controllerRef = useRef<AbortController | null>(null);
  
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
  }

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
    <div className="flex items-center justify-center flex-col">
      <div>Test application</div>
      {error && (
        <button role="alert" onClick={() => setError("")}>
          <span>{error}</span> *Click to remove*
        </button>
      )}
      
      <MachineTable machines={machines}/>

      {isLoading && <div className="animate-spin m-2">e</div>}

      <button
        onClick={() => {
          setIsLoading(true);
          loadMachines();
        }}
        className="bg-amber-200 rounded-full px-4 py-3 w-fit "
      >
        REFRESH
      </button>
    </div>
  );
}


export default App;
