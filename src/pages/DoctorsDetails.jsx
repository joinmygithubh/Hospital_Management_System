import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorById } from "../../api/doctorApi";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    getDoctorById(id).then(res => setDoctor(res.data));
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{doctor.name}</h1>
      <p className="mt-2">{doctor.specialization}</p>
      <p className="mt-1 text-gray-600">{doctor.email}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Availability</h3>
        <pre className="bg-gray-100 p-3 rounded mt-2">
          {JSON.stringify(doctor.availability, null, 2)}
        </pre>
      </div>
    </div>
  );
}
