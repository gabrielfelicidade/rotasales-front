import { Typography } from "@mui/material";
import { useState } from "react";
import SalesActions from "./SalesActions";
import SalesFilter from "./SalesFilter";
import SalesGrid from "./SalesGrid";

export const SaleStatus = {
    'AWAITING_SEPARATION': 'Aguardando separação',
    'SEPARATION_COMPLETED': 'Separação completa',
    'DELIVERED': 'Entregue'
};

const Sales = () => {
    const buyer = useState('');
    const event = useState(' ');
    const donation = useState(false);
    const filterModel = useState({
        buyer: buyer[0],
        donation: donation[0],
        event: event[0],
        page: 0
    });

    const onSearchClick = () => {
        filterModel[1]({
            buyer: buyer[0],
            donation: donation[0],
            event: event[0],
            page: 0
        });
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
            <SalesActions />
            <SalesGrid
                filterModel={filterModel}
            />
        </>
    );
};

export default Sales;