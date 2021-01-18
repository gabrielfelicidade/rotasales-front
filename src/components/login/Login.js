import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, TextField } from "@material-ui/core";

import logo from '../../assets/logo.png';

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

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={logo}
                />
                <CardContent className={classes.content}>
                    <TextField id="standard-basic" label="Usuário" variant="outlined" className={classes.inputs} />
                    <TextField id="standard-basic" label="Senha" variant="outlined" type="password" className={classes.inputs} />
                </CardContent>
                <CardActions className="justify-content-center my-4">
                    <Button variant="contained" color="secondary">Entrar</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login;