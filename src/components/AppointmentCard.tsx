import type { Appointment } from "../types/appointment";
import { useAppointmentContext } from "../context/AppointmentContext";
import { CalendarClock, User, Clock3 } from "lucide-react";

const AppointmentCard: React.FC<{ appt: Appointment; onReschedule: () => void }> = ({
  appt,
  onReschedule,
}) => {
  const { markCompleted } = useAppointmentContext();

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="group transition duration-300 ease-in-out hover:shadow-lg bg-white rounded-xl p-5 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <User className="w-5 h-5 text-purple-500" />
          {appt.patientName}
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            statusColors[appt.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {appt.status}
        </span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
        <Clock3 className="w-4 h-4 text-gray-400" />
        {new Date(appt.time).toLocaleString()}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => markCompleted(appt.id)}
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Mark Completed
        </button>
        <button
          onClick={onReschedule}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
