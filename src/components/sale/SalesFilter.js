import { ExpandMore, Search } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getActiveEvents } from '../../services/EventService';

const SalesFilter = ({ customer, event, donation, onSearchClick }) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        let active = true;

        (async () => {
            if (!active) {
                return;
            }

            const newEvents = await getActiveEvents();

            setEvents(newEvents);
        })();

        return () => {
            active = false;
        };
    }, []);

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField value={customer[0]} onChange={e => customer[1](e.target.value)} id="outlined-basic" label="Comprador" variant="outlined" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl sx={{ minWidth: 80 }}
                            style={{ width: '100%' }}>
                            <InputLabel id="event-select">Evento</InputLabel>
                            <Select
                                labelId="event-select"
                                label="Event"
                                style={{ width: '100%' }}
                                value={event[0]}
                                displayEmpty
                                onChange={e => event[1](e.target.value)}
                            >
                                <MenuItem value={' '}>Todos os eventos</MenuItem>
                                {events.map(event => <MenuItem value={event.id} key={event.id}>{event.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            label="Doação"
                            control={<Checkbox color="primary" checked={donation[0]} onChange={e => donation[1](e.target.checked)} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
                        <Button onClick={onSearchClick} variant="contained" color="primary" endIcon={<Search />}>
                            Procurar
                        </Button>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default SalesFilter;

SalesFilter.propTypes = {
    customer: PropTypes.array.isRequired,
    event: PropTypes.array.isRequired,
    donation: PropTypes.array.isRequired,
    onSearchClick: PropTypes.func.isRequired
}