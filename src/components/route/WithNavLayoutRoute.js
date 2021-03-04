import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../hooks/Authentication";
import WithNavLayout from "../layout/WithNavLayout";

const WithNavLayoutRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            auth.isAuthenticated() ?
                <WithNavLayout>
                    <Component {...props} />
                </WithNavLayout> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default WithNavLayoutRoute;