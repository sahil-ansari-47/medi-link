import { useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const icons = ["/Logo.png", "/icons/doctor.svg", "/icons/hospital.svg"];
  const labels = ["", "Doctors", "Hospitals"];
  const paths = ["/", "/doctors", "/hospitals"];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-primary rounded-t-3xl shadow-lg z-20">
      <div className="flex justify-around items-center h-20">
        {icons.map((icon, index) => {
          const isActive = location.pathname === paths[index];

          return (
            <div
              key={index}
              onClick={() => navigate(paths[index])}
              className={`relative flex flex-col justify-center items-center w-1/4 h-full cursor-pointer group`}
            >
              {/* Active background highlight */}
              <div
                className={`absolute inset-0  transition-opacity duration-200 ${
                  isActive ? "bg-white opacity-20" : "opacity-0 group-hover:opacity-20 bg-black"
                }`}
              />

              {/* Icon */}
              <img
                src={icon}
                alt={`tab-${index}`}
                className={`transition-transform duration-200 transform z-10 ${
                  index === 0 ? "w-16 h-16" : "w-10 h-10"
                } ${isActive ? "scale-110" : "group-hover:scale-105"}`}
              />

              {/* Label */}
              <p
                className={`text-sm font-bold z-10 ${
                  isActive ? "text-emerald-950" : "text-emerald-900"
                }`}
              >
                {labels[index]}
              </p>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
