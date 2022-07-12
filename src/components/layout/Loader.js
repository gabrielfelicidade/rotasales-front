import { useContext } from "react";
import { Oval } from "react-loader-spinner";
import { AuthContext } from "../../hooks/Authentication";
import { useRequests } from "../../hooks/RequestsContext";
import { setupInterceptors } from "../../services/Api";

const Loader = () => {
    const style = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        opacity: '0.5',
        zIndex: 10000,
        overflow: 'auto',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        flexDirection: 'column'
    };
    const auth = useContext(AuthContext);
    const requests = useRequests();

    setupInterceptors(auth.logoff, requests);

    return (
        <>
            {requests.activeRequests > 0 ?
                <div style={style}>
                    <Oval
                        ariaLabel="loading-indicator"
                        height={100}
                        width={100}
                        strokeWidth={5}
                        strokeWidthSecondary={1}
                        color="#000"
                        secondaryColor="#FFF"
                    />
                    <p>Carregando...</p>
                </div>
                : null}
        </>
    )
};

export default Loader;