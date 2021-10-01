import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../hooks/Authentication";

const LogoutButton = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoff = () => {
        auth.logoff();
        history.push('/login');
    }

    return null;
}

export default LogoutButton;