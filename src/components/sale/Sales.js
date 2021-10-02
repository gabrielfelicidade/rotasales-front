import { Typography } from "@mui/material";
import { useState } from "react";
import SalesFilter from "./SalesFilter";
import SalesGrid from "./SalesGrid";

export const SaleStatus = {
    'AWAITING_WITHDRAWAL': 'Aguardando Retirada',
    'WITHDRAWN': 'Retirado'
};

const Sales = () => {
    const buyer = useState('');
    const event = useState(null);
    const donation = useState(false);

    const onSearchClick = () => {
        console.log('search');
    };

    return (
        <>
            <Typography variant="h4" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Minhas Vendas
            </Typography>
            <SalesFilter
                buyer={buyer}
                event={event}
                donation={donation}
                onSearchClick={onSearchClick}
            />
            <SalesGrid />
        </>
    );
};

export default Sales;