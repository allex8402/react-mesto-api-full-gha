// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ component: Component, ...props }) {
//     return props.isLogged ? <Component {...props} /> : <Navigate to="/sign-in" />;
// }

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    if (props.isLogged === false) {
        return (<Navigate to="/sign-in" replace />)
    } else {
        return (<Component {...props} />)
    }
}
export default ProtectedRoute;
