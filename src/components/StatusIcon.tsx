import type { Status } from "../types/machine";

const StatusIcon = ({status} : {status: Status}) => {
  const StatusMap = {
    Running: "oklch(76.5% 0.177 163.223)",
    Maintenance: "oklch(92.4% 0.12 95.746)",
    Stopped: "oklch(57.7% 0.245 27.325)",
  };

  const color = StatusMap[status];
  return (
    <div
      style={{ background: color }}
      className="w-3 h-3 rounded-full"
    />
  );
};

export default StatusIcon;