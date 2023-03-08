// import React from "react";
// import { redirect, Route } from "react-router-dom";

// function PrivateRoute({ component: Component, ...rest }) {
//     const user_data = JSON.parse(localStorage.getItem("user_data"));
//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 if (user_data?.access) {
//                     return <Component {...props} />;
//                 } else {
//                     return redirect("/auth/login");
//                 }
//             }}
//         />
//     );
// }

// export default PrivateRoute;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const location = useLocation();
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    return user_data ? (
        <Outlet />
    ) : (
        <Navigate
            to={{
                pathname: "/auth/login",
                search: `?next=${location.pathname}`,
                
            }}
        />
    );
};
export default PrivateRoute;
