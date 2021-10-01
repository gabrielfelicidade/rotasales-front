import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import logo from '../../assets/logo.png';
import { AuthContext } from "../../hooks/Authentication";
import { toast } from 'react-toastify';
import { Button, Card, CardActions, CardContent, CardMedia, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
    const [formInputs, setFormInputs] = useState({
        username: {
            value: '',
            error: true,
            touched: false
        },
        password: {
            value: '',
            error: true,
            touched: false
        }
    });
    const history = useHistory();

    const isFormValid = () => Object.values(formInputs).reduce((acm, act) => acm && !act.error && act.touched, true);

    const inputChangeHandler = (event) => {
        const newInputValue = { ...formInputs[event.target.name], value: event.target.value, touched: true, error: false };
        if (event.target.value === '')
            newInputValue.error = true;
        setFormInputs({ ...formInputs, [event.target.name]: newInputValue });
    }

    const authenticate = async () => {
        if (isFormValid()) {
            await auth.login(formInputs.username.value, formInputs.password.value);
            history.push('/sales');
        } else {
            toast.error('Preencha todos os campos corretamente!');
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={logo}
                />
                <CardContent className={classes.content}>
                    <TextField required name="username" label="Usuário" variant="outlined" className={classes.inputs} value={formInputs.username.value} onChange={inputChangeHandler} />
                    <TextField required name="password" label="Senha" variant="outlined" type="password" className={classes.inputs} value={formInputs.password.value} onChange={inputChangeHandler} />
                </CardContent>
                <CardActions className="justify-content-center my-4">
                    <Button variant="contained" color="secondary" onClick={authenticate}>Entrar</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login;