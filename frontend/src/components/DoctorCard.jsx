import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <Link to={`/doctors/${doctor.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-emerald-800">{doctor.name}</h2>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          <p className="text-sm text-gray-500">{doctor.qualification}</p>
          <p className="text-sm text-gray-700 font-semibold mt-2">{doctor.experience} yrs experience</p>
          <p className="text-sm text-gray-700">Fees: ₹{doctor.fees}</p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;