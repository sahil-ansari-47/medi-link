const AppointmentHomeCard = () => {
  return (
    <div className="relative h-50 w-sm mx-4 overflow-hidden bg-white shadow-lg inset-shadow-sm/50 rounded-tr-2xl rounded-bl-2xl sm:h-64 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.02]">
      <div className="absolute top-10 left-10">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
          My Appointments
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <img
          className="w-40 sm:w-48 object-contain -translate-y-5 translate-x-20"
          src="/clipboard.png"
          alt=""
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-0">
        <img className="w-full" src="/wave (2).svg" alt="Wave background" />
      </div>
    </div>
  );
};

export default AppointmentHomeCard;
