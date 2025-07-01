import React from "react";
import { useAppointmentContext } from "../context/AppointmentContext";

const FilterBar = () => {
  const { filter, setFilter } = useAppointmentContext();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow">
      <select
        className="border p-2 rounded w-full md:w-auto"
        value={filter.status}
        onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
      >
        <option value="">All</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="date"
        className="border p-2 rounded"
        value={filter.startDate}
        onChange={(e) => setFilter((f) => ({ ...f, startDate: e.target.value }))}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={filter.endDate}
        onChange={(e) => setFilter((f) => ({ ...f, endDate: e.target.value }))}
      />
    </div>
  );
};

export default FilterBar;