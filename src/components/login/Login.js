import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, TextField, Typography } from "@material-ui/core";

import logo from '../../assets/logo.png';

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        minWidth: 275,
        width: "25%",
        textAlign: 'center',
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
    }
});

const Login = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={logo}
                />
                <CardContent>
                    <TextField id="standard-basic" label="Usuário" variant="outlined" className="my-3" />
                    <TextField id="standard-basic" label="Senha" variant="outlined" type="password" className="my-2" />
                </CardContent>
                <CardActions className="justify-content-center my-4">
                    <Button variant="contained" color="secondary">Entrar</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login;