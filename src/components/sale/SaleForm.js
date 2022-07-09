import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Add } from '@mui/icons-material';
import { useState } from "react";
import { useEffect } from "react";
import { getActiveEvents } from "../../services/EventService";
import { getItemsByEventId } from "../../services/ItemService";
import { formatCurrency } from "../../utils/FormatUtils";

const SaleForm = (props) => {
    const [sale, setSale] = props.sale;
    const [events, setEvents] = useState([]);
    const [items, setItems] = useState([]);
    const [itemsMap, setItemsMap] = useState({});

    useEffect(() => {
        let active = true;

        (async () => {
            if (!active) {
                return;
            }

            const newEvents = await getActiveEvents();

            setEvents(newEvents);

            if (sale.event) {
                const eventItems = await getItemsByEventId(sale.event);
                setItems(eventItems);
                setItemsMap(eventItems.reduce((acm, acc) => { acm[acc.id] = acc; return acm }, {}));
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    const handleChangeSale = (field, value) => {
        setSale({ ...sale, [field]: value });
    }

    const handleChangeEvent = (event) => {
        setSale({ ...sale, event: event.target.value, items: [] });
        
        (async() => {
            const eventItems = await getItemsByEventId(event.target.value);
            setItems(eventItems);
            setItemsMap(eventItems.reduce((acm, acc) => { acm[acc.id] = acc; return acm }, {}));
        })();
    }

    const handleAddItem = () => {
        setSale({ ...sale, items: [ ...sale.items, { id: '', amount: 1 } ] })
    }

    const handleChangeItem = (event, index) => {
        const existentItemIndex = sale.items.findIndex(item => item.id === event.target.value);
        const newItems = [ ...sale.items ];
        newItems[index] = { ...sale.items[index], id: event.target.value };

        if (existentItemIndex >= 0) {
            newItems[existentItemIndex].amount = newItems[existentItemIndex].amount + newItems[index].amount;
            newItems.splice(index);
        }

        setSale({ ...sale, items: newItems });
    }

    const handleChangeItemAmount = (event, index) => {
        let value = 1;
        if (new RegExp("^[0-9]+$").test(event.target.value)) {
            value = parseInt(event.target.value) <= 0 ? 1 : parseInt(event.target.value) >= 100000 ? 99999 : parseInt(event.target.value);
        }
        const newItem = { ...sale.items[index] };
        newItem.amount = value;
        const newItems = [ ...sale.items ];
        newItems[index] = newItem;

        setSale({ ...sale, items: newItems });
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <TextField value={sale.buyer} onChange={(e) => handleChangeSale('buyer', e.target.value)} id="buyer" label="Comprador" variant="outlined" style={{ width: '100%' }} />
            </Grid>
            {events.length > 0 ? <Grid item xs={12} md={4}>
                <FormControl sx={{ minWidth: 80 }}
                    style={{ width: '100%' }}>
                    <InputLabel id="event-select">Evento</InputLabel>
                    <Select
                        id="event"
                        labelId="event-select"
                        label="Event"
                        style={{ width: '100%' }}
                        value={sale.event}
                        displayEmpty
                        onChange={handleChangeEvent}
                        disabled={props.eventChangeDisabled || false}
                    >
                        {events.map(event => <MenuItem value={event.id} key={event.id}>{event.title}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid> : null}
            <Grid item xs={12} md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                <FormControlLabel
                    label="Doação"
                    control={<Checkbox color="primary" checked={sale.donation} onChange={(e) => handleChangeSale('donation', !sale.donation)} />}
                />
            </Grid>
            {sale.items.length > 0 && items.length > 0 ? sale.items.map((item, index) => {
                const totalAmount = item.id ? item.amount * (itemsMap[item.id] ? itemsMap[item.id].value : 0) : 0;

                return (
                    <Grid item xs={12} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'center'  }} key={`grid-item-${index}`}>
                        <FormControl sx={{ minWidth: 80 }}
                            style={{ width: '100%' }}>
                            <InputLabel id="item-select">Item</InputLabel>
                            <Select
                                labelId="item-select"
                                label="item"
                                style={{ width: '100%' }}
                                value={item.id}
                                onChange={(e) => handleChangeItem(e, index)}
                            >
                                <MenuItem value={''}>Selecione um item</MenuItem>
                                {items.map(item => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField type="number" value={item.amount} onChange={(e) => handleChangeItemAmount(e, index)} id="amount" label="Quantidade" variant="outlined" />
                        <TextField disabled value={formatCurrency(totalAmount)} id="total" label="Valor Total" variant="outlined" />
                    </Grid>
            )}) : null}
            {sale.event ? <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="contained" color="success" endIcon={<Add />} onClick={handleAddItem}>
                    Adicionar item
                </Button>
            </Grid> : null}
        </Grid>
    )
};

export default SaleForm;