import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import logo from '../../assets/logo.png';
import { AuthContext } from "../../hooks/Authentication";
import { toast } from 'react-toastify';
import { Button, Card, CardActions, CardContent, CardMedia, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { styled } from "@mui/system";

const styles = {
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        gap: '25px',
        width: '100%'
    },
    inputs: {
        width: '70%'
    }
};

const StyledCard = styled(Card)({
    minWidth: 350,
    width: "15%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: '25px 0'
});

const StyledButton = styled(Button)({
    backgroundColor: '#d6004c',
    '&:hover': {
        backgroundColor: '#c51162'
    }
});

const StyledActions = styled(CardActions)({
    margin: '1.5rem 0'
});

const Login = (props) => {
    const { classes } = props;
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            authenticate();
        }
    }

    return (
        <div className={classes.root}>
            <StyledCard>
                <CardMedia
                    className={classes.media}
                    image={logo}
                />
                <CardContent className={classes.content}>
                    <TextField required name="username" label="Usuário" variant="outlined" className={classes.inputs} value={formInputs.username.value} onChange={inputChangeHandler} onKeyDown={handleKeyDown} />
                    <TextField required name="password" label="Senha" variant="outlined" type="password" className={classes.inputs} value={formInputs.password.value} onChange={inputChangeHandler} onKeyDown={handleKeyDown} />
                </CardContent>
                <StyledActions>
                    <StyledButton variant="contained" color="primary" onClick={authenticate}>Entrar</StyledButton>
                </StyledActions>
            </StyledCard>
        </div>
    )
}

export default withStyles(styles)(Login);