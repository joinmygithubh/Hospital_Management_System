import React, { useEffect, useState } from "react";

export default function DoctorForm() {
  const [specializations, setSpecializations] = useState([]);

  const [form, setForm] = useState({
    specialization: "",
    qualification: "",
    experience: "",
    licenseNumber: "",
    consultationFee: "",
    bio: "",
    hospitalName: "",
    city: "",
    state: "",
    profileImage: null,
    documents: [],
    availability: [{ day: "monday", startTime: "", endTime: "" }],
  });

  /* ---------------- FETCH SPECIALIZATIONS ---------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors/meta/specializations")
      .then((res) => res.json())
      .then((data) => setSpecializations(data))
      .catch((err) => console.error(err));
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "profileImage") {
      setForm({ ...form, profileImage: e.target.files[0] });
    } else {
      setForm({ ...form, documents: e.target.files });
    }
  };

  /* ---------------- AVAILABILITY ---------------- */
  const handleAvailabilityChange = (index, field, value) => {
    const updated = [...form.availability];
    updated[index][field] = value;
    setForm({ ...form, availability: updated });
  };

  const addAvailability = () => {
    setForm({
      ...form,
      availability: [
        ...form.availability,
        { day: "monday", startTime: "", endTime: "" },
      ],
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (
        key !== "availability" &&
        key !== "documents" &&
        key !== "profileImage" &&
        key !== "hospitalName" &&
        key !== "city" &&
        key !== "state"
      ) {
        formData.append(key, value);
      }
    });

    formData.append(
      "hospital",
      JSON.stringify({
        name: form.hospitalName,
        address: { city: form.city, state: form.state },
      }),
    );

    formData.append("availability", JSON.stringify(form.availability));

    if (form.profileImage) {
      formData.append("profileImage", form.profileImage);
    }

    for (let doc of form.documents) {
      formData.append("documents", doc);
    }

    try {
      const res = await fetch("http://localhost:5000/api/doctors/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      await res.json();
      alert("Doctor Profile Created ✅");
    } catch (err) {
      console.error(err);
      alert("Error creating profile ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Doctor Profile Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            name="specialization"
            onChange={handleChange}
            className="border p-2 rounded-xl"
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map((sp, i) => (
              <option key={i} value={sp}>
                {sp}
              </option>
            ))}
          </select>

          <input
            name="qualification"
            placeholder="Qualification"
            className="border p-2 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            name="experience"
            type="number"
            placeholder="Experience (years)"
            className="border p-2 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            name="licenseNumber"
            placeholder="License Number"
            className="border p-2 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            name="consultationFee"
            type="number"
            placeholder="Consultation Fee"
            className="border p-2 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            className="border p-2 rounded-xl"
          />

          <input
            type="file"
            name="documents"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded-xl"
          />

          <input
            name="hospitalName"
            placeholder="Hospital Name"
            className="border p-2 rounded-xl"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="border p-2 rounded-xl"
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            className="border p-2 rounded-xl"
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            className="border p-2 rounded-xl md:col-span-2"
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">Availability</h3>

            {form.availability.map((slot, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <select
                  value={slot.day}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "day", e.target.value)
                  }
                  className="border p-2 rounded-xl"
                >
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "startTime", e.target.value)
                  }
                  className="border p-2 rounded-xl"
                />

                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "endTime", e.target.value)
                  }
                  className="border p-2 rounded-xl"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addAvailability}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              + Add Slot
            </button>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
