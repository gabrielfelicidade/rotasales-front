import { Check, Clear } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createSale } from '../../services/SaleService';
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
        buyer: '',
        event: '',
        donation: false,
        items: []
    });
    const history = useHistory();

    const handleSaveButton = () => {
        if (isSaleValid()) {
            const saleObject = {
                buyer: sale[0].buyer,
                event: { id: sale[0].event },
                donation: sale[0].donation,
                items: sale[0].items.map(item => { return { item: { id: item.id }, amount: item.amount } })
            };
            createSale(saleObject)
            .then(_ => toast.success('Venda cadastrada com sucesso!'))
            .then(_ => history.push('/sales'))
            .catch(_ => toast.error('Erro ao cadastrar venda'));
        } else {
            toast.error('Preencha corretamente todos os campos!');
        }
    }

    const handleCancelButton = () => {
        history.push('/sales');
    }

    const isSaleValid = () => {
        return sale[0].buyer !== '' && sale[0].event !== '' && sale[0].items.length > 0 && sale[0].items.filter(item => item.id === '').length === 0;
    }

    return (
        <>
            <Typography variant="h4" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Cadastrar Venda
            </Typography>
            <SaleForm sale={sale} />
            <CreateSalesActionsContainer>
                <Button variant="contained" color="success" endIcon={<Check />} onClick={handleSaveButton}>
                    Salvar
                </Button>
                <Button variant="contained" color="error" endIcon={<Clear />} onClick={handleCancelButton}>
                    Cancelar
                </Button>
            </CreateSalesActionsContainer>
        </>
    );
};

export default CreateSale;