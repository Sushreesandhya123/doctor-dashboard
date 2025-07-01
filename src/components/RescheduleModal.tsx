import React, { useState } from "react";

const RescheduleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTime: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [newTime, setNewTime] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="font-bold text-lg mb-4">Reschedule Appointment</h2>
        <input
          type="datetime-local"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(newTime);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;