import { Outlet } from "react-router-dom";
import { Nav, Header } from "./Index";
const Layout = () => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
