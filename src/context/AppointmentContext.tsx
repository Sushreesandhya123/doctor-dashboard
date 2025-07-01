import React, { createContext, useContext, useEffect, useState } from "react";
import type { Appointment } from "../types/appointment";
import { fetchAppointments } from "../api/appointments";

interface AppointmentContextType {
  appointments: Appointment[];
  markCompleted: (id: number) => void;
  reschedule: (id: number, newTime: string) => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: Filter;
  error: string | null; // ✅ add error to context
}

interface Filter {
  status: string;
  startDate: string;
  endDate: string;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<Filter>({
    status: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState<string | null>(null); // ✅ Error state

  useEffect(() => {
    fetchAppointments()
      .then((data) => {
        setAppointments(data);
        setError(null); // clear error if successful
      })
      .catch(() => {
        setError("Failed to load appointments."); // set error message
      });
  }, []);

  const markCompleted = (id: number) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "completed" } : appt
      )
    );
  };

  const reschedule = (id: number, newTime: string) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, time: newTime } : appt
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, markCompleted, reschedule, filter, setFilter, error }} // ✅ Provide error
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("useAppointmentContext must be used within provider");
  return context;
};
