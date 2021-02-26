import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import logo from '../../assets/logo.png';
import { AuthContext } from "../../hooks/Authentication";
import Api from "../../services/Api";

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        minWidth: 350,
        width: "15%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'pink',
        padding: '15px 0'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        width: 171,
        height: 60,
        margin: '20px auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    inputs: {
        margin: '12px auto',
        width: '70%'
    }
});

const Login = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const [formInputs, setFormInputs] = useState({ username:'', password:'' });
    const history = useHistory();

    const authenticate = async () => {
        const token = await auth.login(formInputs.username, formInputs.password);
        Api.defaults.headers.Authorization = `Bearer ${token.token}`;
        history.push('/sales');
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={logo}
                />
                <CardContent className={classes.content}>
                    <TextField id="standard-basic" label="Usuário" variant="outlined" className={classes.inputs} value={formInputs.username} onChange={(e) => setFormInputs({ ...formInputs, username: e.target.value })} />
                    <TextField id="standard-basic" label="Senha" variant="outlined" type="password" className={classes.inputs} value={formInputs.password} onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })} />
                </CardContent>
                <CardActions className="justify-content-center my-4">
                    <Button variant="contained" color="secondary" onClick={authenticate}>Entrar</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login;