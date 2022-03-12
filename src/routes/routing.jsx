import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Routing({ publicRoutes, initialRoutes }) {
  const { token, currentUser } = useSelector((state) => state.app);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const activeRoutes = initialRoutes.filter((route) =>
      currentUser?.permissions?.includes(route?.permission)
    );
    setRoutes([...activeRoutes]);

    // eslint-disable-next-line
  }, [currentUser?.permissions]);

  return (
    <>
      {!token && (
        <Routes>
          {publicRoutes?.map((route) => {
            const { path, element, props } = route;
            const Element = element;
            return (
              <Route key={path} path={path} element={<Element {...props} />} />
            );
          })}
          <Route path={"*"} element={<Navigate to={"/login"} />} />
        </Routes>
      )}
      {token && routes?.length !== 0 && (
        <Routes>
          {routes?.map((route) => {
            const { path, element } = route;
            const Element = element;
            return <Route key={path} path={path} element={<Element />} />;
          })}
          <Route
            path="*"
            element={<Navigate to={routes[0]?.path || "/dashboard"} />}
          />
        </Routes>
      )}
    </>
  );
}

export default Routing;
