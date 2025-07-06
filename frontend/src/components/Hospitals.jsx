import { useEffect, useState } from "react";
import axios from "../utils/axios"

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get("hospitals/");
        console.log(res.data)
        setHospitals(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2 className="text-xl font-bold mb-4">Hospitals</h2>
      <ul>
        {hospitals.map((h) => (
          <li key={h.id}>{h.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
