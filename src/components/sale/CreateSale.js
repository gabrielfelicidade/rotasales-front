import { Check } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { SaleContext } from './SaleContext';
import SaleForm from './SaleForm';

const CreateSalesActionsContainer = styled('div')({
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media(min-width: 601px)': {
        flexDirection: 'row',
        justifyContent: 'right',
    }
});

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
        <SaleContext.Provider value={sale}>
            <Typography variant="h4" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Cadastrar Venda
            </Typography>
            <SaleForm />
            <CreateSalesActionsContainer>
                <Button variant="contained" color="success" endIcon={<Check />} onClick={handleSaveButton}>
                    Salvar
                </Button>
            </CreateSalesActionsContainer>
        </SaleContext.Provider>
    );
};

export default CreateSale;