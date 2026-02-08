import { useState } from "react";
import { updateAvailability } from "../../api/doctorApi";

export default function DoctorAvailability() {
  const [availability, setAvailability] = useState("");

  const submit = async () => {
    await updateAvailability({ availability });
    alert("Availability Updated");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Update Availability</h2>

      <textarea
        className="border w-full p-2"
        placeholder="e.g. Mon-Fri 10AM-4PM"
        onChange={(e) => setAvailability(e.target.value)}
      />

      <button
        onClick={submit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
