import { Typography } from '@mui/material';
import { useState } from 'react';
import SaleForm from './SaleForm';

const CreateSale = () => {
    const sale = useState({
        customer: '',
        event: '',
        donation: false,
        items: []
    });

    const handleSaveButton = () => {

    }

    return (
        <>
            <Typography variant="h4" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Cadastrar Venda
            </Typography>
            <SaleForm sale={sale} />
        </>
    );
};

export default CreateSale;