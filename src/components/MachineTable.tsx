import type { Machine } from "../types/machine";
import StatusIcon from "./StatusIcon";

const MachineTable = ({machines}: {machines: Machine[]}) => {
  return (
    <table className="mx-10 my-30  w-full ">
      <thead>
        <tr className="grid grid-cols-[10%_1fr_1fr_20%] bg-slate-800 text-white/90 font-semibold">
          <td className="py-2 px-2 text-left">Id</td>
          <td className="py-2 px-2 text-left">Name</td>
          <td className="py-2 px-2 text-left">Location</td>
          <td className="py-2 px-2 text-left">Status</td>
        </tr>
      </thead>
      <tbody>
        {machines.map((m) => (
          <tr
            key={m.id}
            className="grid grid-cols-[10%_1fr_1fr_20%] w-full bg-slate-600 text-white/70 "
          >
            <td className="py-2 px-2 text-left">{m.id}</td>
            <td className="py-2 px-2 text-left">{m.name}</td>
            <td className="py-2 px-2 text-left">{m.location}</td>
            <td className="py-2 px-2 flex gap-2 items-center">
              <StatusIcon status={m.status} />
              {m.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MachineTable;
