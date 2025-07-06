import { useUser } from "./UserContext";
import debounce from "lodash.debounce";
import { useState, useCallback, useEffect } from "react";
import DoctorHomeCard from "./DoctorHomeCard";
import PharmacyHomeCard from "./PharmacyHomeCard";
import AppointmentHomeCard from "./AppointmentHomeCard";
import AmbulanceHomeCard from "./AmbulanceHomeCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = async (search) => {
    try {
      const res = await fetch(`/api/search?q=${search}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedFetch = useCallback(
    debounce((val) => {
      if (val.length >= 2) fetchResults(val);
      else setResults([]);
    }, 500),
    []
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulated loading
  }, []);

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      {/* Sticky Search Header */}
      <div className="bg-primary z-10 shadow-md flex flex-col justify-between pb-8">
        <div className="text-center my-2 flex flex-col justify-around">
          <h1 className="text-xl font-bold text-emerald-800">
            Hi, {user.first_name}!
          </h1>
          <p className="text-lg text-emerald-800 mt-2 animate-bounce hover:text-red-400">
            How may we help you today?
          </p>
        </div>
      </div>
      <div className="flex justify-center transform -translate-y-6 sticky top-20 z-20">
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedFetch(e.target.value);
          }}
          placeholder="Search for doctors, hospitals, etc..."
          className="w-11/12 max-w-lg max-h-10 px-4 py-2 border bg-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
      {/* Optionally render search results */}
      {results.length > 0 && (
        <div className="p-4 max-w-6xl mx-auto">
          <h3 className="font-bold text-emerald-900">Search Results:</h3>
          <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
            {results.map((r, i) => (
              <li key={i}>{r.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Card Grid */}
      <div className="flex flex-wrap items-center justify-center gap-y-6">
        {loading ? (
          <SkeletonCards />
        ) : (
          <>
            <Link to="/doctors">
              <DoctorHomeCard />
            </Link>
            <Link to="/ambulance">
              <AmbulanceHomeCard />
            </Link>
            <Link to="/pharmacy">
              <PharmacyHomeCard />
            </Link>
            <Link to="/appointments">
              <AppointmentHomeCard />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const SkeletonCards = () => (
  <>
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"
      ></div>
    ))}
  </>
);

export default Home;
