import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../hooks/Authentication";

const LogoutButton = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoff = () => {
        auth.logoff();
        history.push('/login');
    }

    return <Nav.Link onClick={logoff}>Sair</Nav.Link>
}

export default LogoutButton;