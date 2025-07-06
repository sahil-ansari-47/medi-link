// Doctors.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doctors/");
        console(response);
        setDoctors(response.data.results);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading doctors...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 flex-flex-wrap md:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {Array.isArray(doctors) &&
        doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
    </div>
  );
};

export default Doctors;
