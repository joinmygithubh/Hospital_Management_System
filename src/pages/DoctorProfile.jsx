import { useState } from "react";
import { createDoctorProfile, updateDoctorProfile } from "../../api/doctorApi";

export default function DoctorProfile({ isEdit }) {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: ""
  });

  const submitHandler = async () => {
    isEdit
      ? await updateDoctorProfile(form)
      : await createDoctorProfile(form);

    alert("Profile saved");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Update Profile" : "Create Profile"}
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Specialization"
        onChange={(e) => setForm({ ...form, specialization: e.target.value })}
      />

      <button
        onClick={submitHandler}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
