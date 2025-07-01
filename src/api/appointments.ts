import type { Appointment } from "../types/appointment";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  return [
    {
      id: 1,
      patientName: "John Doe",
      time: "2025-07-01T10:00",
      status: "confirmed",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "2025-07-01T12:00",
      status: "pending",
    },
    {
      id: 3,
      patientName: "Aarav Patel",
      time: "2025-07-02T09:30",
      status: "confirmed",
    },
    {
      id: 4,
      patientName: "Emily Johnson",
      time: "2025-07-02T14:00",
      status: "completed",
    },
    {
      id: 5,
      patientName: "Ravi Kumar",
      time: "2025-07-03T11:00",
      status: "pending",
    },
    {
      id: 6,
      patientName: "Sophia Williams",
      time: "2025-07-03T15:30",
      status: "confirmed",
    },
  ];
};
