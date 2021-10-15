import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext } from "react";
import { SaleContext } from "./SaleContext";

const SaleForm = () => {
    console.log('render saleForm');

    const saleContext = useContext(SaleContext);

    const [parentSale, setParentSale] = saleContext;
    const customer = parentSale.customer;
    const event = parentSale.event;
    const donation = parentSale.donation;

    const updateSale = (property, value) => {
        switch (property) {
            case 'CUSTOMER':
                setParentSale({ ...parentSale, customer: value });
                break;
            case 'EVENT':
                setParentSale({ ...parentSale, event: value });
                break;
            case 'DONATION':
                setParentSale({ ...parentSale, donation: value });
                break;
            default:
                console.log('Invalid property set.');
        }
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <TextField value={customer} onChange={e => updateSale('CUSTOMER', e.target.value)} id="outlined-basic" label="Comprador" variant="outlined" style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl sx={{ minWidth: 80 }}
                    style={{ width: '100%' }}>
                    <InputLabel id="event-select">Evento</InputLabel>
                    <Select
                        labelId="event-select"
                        label="Event"
                        style={{ width: '100%' }}
                        value={event}
                        displayEmpty
                        onChange={e => updateSale('EVENT', e.target.value)}
                    >
                        <MenuItem value={' '}>Todos os eventos</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                <FormControlLabel
                    label="Doação"
                    control={<Checkbox color="primary" checked={donation} onChange={e => updateSale('DONATION', e.target.checked)} />}
                />
            </Grid>
        </Grid>
    )
};

export default SaleForm;