import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../hooks/Authentication"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => (
            auth.isAuthenticated ?
                <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default ProtectedRoute;