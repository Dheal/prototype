import Routing from "./routing";

import Login from "pages/login";
// import SignUp from "pages/signup";
import Dashboard from "pages/dashboard";
import LatestRecords from "pages/latest-records";
import Orders from "pages/orders";

import Navbar from "components/navbar";
import ForgetPass from "components/forget-password";
import MessageBox from "components/message-box";

const Routes = () => {
  return (
    <>
      <Navbar />
      <Routing publicRoutes={publicRoutes} initialRoutes={initialRoutes} />
      <MessageBox />
    </>
  );
};

export default Routes;

const publicRoutes = [
  {
    path: "/login",
    element: Login,
    permission: "public",
  },
  // {
  //   path: "/signup",
  //   element: SignUp,
  //   permission: "public",
  // },
];
const initialRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
    permission: "patient",
  },
  {
    path: "/patient/:id",
    element: LatestRecords,
    permission: "patient",
  },
];
