import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Doctors,
  Hospitals,
  Appointments,
  ProtectedRoute,
  UserProvider,
  Layout,
} from "./components/Index";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
