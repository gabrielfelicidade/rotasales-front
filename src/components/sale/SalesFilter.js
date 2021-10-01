import { ExpandMore, Search } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const SalesFilter = ({ buyer, event, donation, onSearchClick }) => {
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
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <TextField value={buyer[0]} onChange={e => buyer[1](e.target.value)} id="outlined-basic" label="Comprador" variant="outlined" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <FormControl sx={{ minWidth: 80 }}
                            style={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Evento</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                label="Age"
                                style={{ width: '100%' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Twenty</MenuItem>
                                <MenuItem value={21}>Twenty one</MenuItem>
                                <MenuItem value={22}>Twenty one and a half</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            label="Doação"
                            control={<Checkbox color="primary" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2} style={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" endIcon={<Search />}>
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
    buyer: PropTypes.array.isRequired,
    event: PropTypes.array.isRequired,
    donation: PropTypes.array.isRequired,
    onSearchClick: PropTypes.func.isRequired
}