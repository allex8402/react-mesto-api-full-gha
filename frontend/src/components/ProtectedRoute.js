// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ component: Component, ...props }) {
//     return props.isLogged ? <Component {...props} /> : <Navigate to="/sign-in" />;
// }

// export default ProtectedRoute;

import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route>
            {() =>
                props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
            }
        </Route>
    );
};
export default ProtectedRoute;
