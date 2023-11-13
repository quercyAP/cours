import React from "react";
import { Navigate} from "react-router-dom";
import AuthenticationService from "./service/authentication-service";

const PrivateRoute: React.FC<{ path: string; element: React.ReactElement; }> = ({ path, element }) => {
    const isAuthenticated = AuthenticationService.isAuthenticated;
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return element;
};

export default PrivateRoute;