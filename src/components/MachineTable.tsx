import type { Machine, Status } from "../types/machine";
import StatusIcon from "./StatusIcon";

const MachineTable = ({
  machines,
  updateStatus,
}: {
  machines: Machine[];
  updateStatus: (status: Status, id: number) => void;
}) => {
  return (
    <table className="border-collapse">
      <thead>
        <tr className="grid grid-cols-[1fr_4fr_4fr_4fr_4fr] rounded-tl-lg rounded-tr-lg space-x-4 px-4 py-4 text-left poppins-regular *:font-normal border-border border text-muted">
          <th>Id</th>
          <th>Name</th>
          <th>Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {machines.map((m, index) => (
          <tr
            key={m.id}
            className={`${index == machines.length - 1 ? "rounded-bl-lg rounded-br-lg" : ""} grid grid-cols-[1fr_4fr_4fr_4fr_4fr] items-center  space-x-4 px-4 py-4 text-left border-r border-l border-b border-border text-muted`}
          >
            <td>{m.id}</td>
            <td className="poppins-medium text-foreground">{m.name}</td>
            <td>{m.location}</td>
            <td className="flex gap-2 items-center">
              <StatusIcon status={m.status} />
              {m.status}
            </td>
            <td className="flex items-center space-x-4">
              <button className="rounded-full  hover:text-warning px-2 py-2 transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pen preview-icon"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                </svg>
              </button>

              <button className="rounded-full text-danger/75 hover:text-danger px-2 py-2 transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash preview-icon"
                >
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MachineTable;
