import { useState, useEffect } from "react";
import { useAppointmentContext } from "../context/AppointmentContext";
import FilterBar from "../components/FilterBar";
import AppointmentCard from "../components/AppointmentCard";
import RescheduleModal from "../components/RescheduleModal";
import { CalendarDays, Stethoscope, CalendarCheck } from "lucide-react";

const Dashboard = () => {
  const { appointments, filter, reschedule } = useAppointmentContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fake loading simulation
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load appointments.");
      }
    };
    load();
  }, []);

  // Filtering appointments
  const filtered = appointments.filter((appt) => {
    const matchesStatus = filter.status ? appt.status === filter.status : true;
    const matchesStart = filter.startDate ? appt.time >= filter.startDate : true;
    const matchesEnd = filter.endDate ? appt.time <= filter.endDate : true;
    return matchesStatus && matchesStart && matchesEnd;
  });

  // Count per status
  const counts = appointments.reduce(
    (acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Status color mapping
  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-blue-100 text-blue-700",
  };

  const todayDate = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((appt) =>
    appt.time.startsWith(todayDate)
  );

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Stethoscope className="text-purple-600 w-8 h-8" />
        <h1 className="text-3xl font-extrabold text-gray-800">Doctor Dashboard</h1>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar />
      </div>

      {/* Status Count Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {Object.entries(counts).map(([key, val]) => (
          <div
            key={key}
            className={`rounded-xl p-4 shadow-md border-l-4 ${
              statusColors[key] || "bg-gray-100 text-gray-700"
            } border-gray-300`}
          >
            <h3 className="text-lg font-semibold capitalize">{key}</h3>
            <p className="text-2xl font-bold">{val}</p>
          </div>
        ))}
      </div>

      {/* Today’s Appointments Section */}
      {todayAppointments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CalendarCheck className="text-blue-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">
              Today’s Appointments
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayAppointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white border-l-4 border-purple-500 p-4 rounded-lg shadow text-sm hover:shadow-md transition"
              >
                <p className="font-bold text-gray-800">{appt.patientName}</p>
                <p className="text-gray-600">
                  {new Date(appt.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="capitalize text-gray-500">Status: {appt.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {error && (
          <div className="text-red-600 col-span-full text-center">{error}</div>
        )}

        {loading ? (
          <div className="col-span-full text-center text-gray-400 animate-pulse">
            Loading appointments...
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              onReschedule={() => setSelectedId(appt.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-10">
            <CalendarDays className="mx-auto mb-2 w-12 h-12 text-gray-400" />
            No appointments found for selected filters.
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        onSubmit={(newTime) => {
          if (selectedId !== null) reschedule(selectedId, newTime);
        }}
      />
    </div>
  );
};

export default Dashboard;
