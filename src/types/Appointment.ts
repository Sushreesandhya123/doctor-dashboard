export interface Appointment {
  id: number;
  patientName: string;
  time: string;
  status: "confirmed" | "pending" | "completed";
}