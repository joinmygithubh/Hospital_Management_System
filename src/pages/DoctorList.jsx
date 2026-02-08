import { useEffect, useState } from "react";
import { getDoctors } from "../../api/doctorApi";
import DoctorCard from "../../components/doctors/DoctorCard";
import FilterBar from "../../components/doctors/FilterBar";

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async (filters = {}) => {
        const res = await getDoctors(filters);
        setDoctors(res.data);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Doctors</h1>

            <FilterBar onFilter={fetchDoctors} />

            <div className="grid md:grid-cols-3 gap-6 mt-6">
                {doctors.map(doc => (
                    <DoctorCard key={doc._id} doctor={doc} />
                ))}
            </div>
        </div>
    );
}
