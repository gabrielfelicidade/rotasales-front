import { Card, CardContent, Grid, Typography } from "@mui/material";

const Home = () => {
    return (
        <>
            <Typography variant="h4" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Histórico de Eventos
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Card variant="outlined" style={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ lineHeight: '2.5rem' }}>
                                Pizzaract
                            </Typography>
                            <Typography variant="body2" style={{ lineHeight: '1.5rem' }}>
                                500 unidades vendidas
                            </Typography>
                            <Typography variant="body2" style={{ lineHeight: '1.5rem' }}>
                                0 unidades entregues
                            </Typography>
                            <Typography variant="body2" style={{ lineHeight: '1.5rem' }}>
                                Vendas em aberto
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Card variant="outlined" style={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ lineHeight: '2.5rem' }}>
                                Pizzaract
                            </Typography>
                            <Typography variant="body2" style={{ lineHeight: '1.5rem' }}>
                                500 unidades vendidas
                            </Typography>
                            <Typography variant="body2" style={{ lineHeight: '1.5rem' }}>
                                0 unidades entregues
                            </Typography>
                            <Typography variant="body2" style={{ lineHeight: '1.5rem' }}>
                                Vendas em aberto
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
};

export default Home;