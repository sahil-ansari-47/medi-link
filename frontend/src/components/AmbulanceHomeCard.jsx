const AmbulanceHomeCard = () => {
  return (
    <div className="relative h-50 w-sm mx-4 bg-white shadow-lg inset-shadow-sm/50 rounded-tr-2xl rounded-bl-2xl overflow-hidden sm:h-64 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.02]">
      <div className="absolute top-10 left-10">
        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Book An Ambulance
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <img
          className="w-40 sm:w-48 object-contain -translate-y-4 translate-x-20"
          src="/ambulance.png"
          alt="Ambulance"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-0">
        <img className="w-full" src="/wave (3).svg" alt="Wave background" />
      </div>
    </div>
  );
};

export default AmbulanceHomeCard;
