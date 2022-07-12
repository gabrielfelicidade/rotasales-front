import { Check, Clear } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSaleById, updateSale } from '../../services/SaleService';
import SaleForm from './SaleForm';

const ActionsContainer = styled('div')({
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media(min-width: 601px)': {
        flexDirection: 'row',
        justifyContent: 'right',
    }
});

const UpdateSale = (props) => {
    const history = useHistory();
    const saleId = props.history.location.state?.id;
    const sale = useState({
        buyer: '',
        event: '',
        donation: false,
        items: []
    });

    if (!saleId) {
        history.push('/sales');
    }

    useEffect(() => {
        let active = true;

        (async () => {
            if (!active) {
                return;
            }

            const getSale = await getSaleById(saleId);

            sale[1]({
                buyer: getSale.buyer,
                event: getSale.event.id,
                donation: getSale.donation,
                items: getSale.items.map(item => { return { amount: item.amount, id: item.item.id } })
            });
        })();

        return () => {
            active = false;
        };
        // eslint-disable-next-line
    }, []);

    const handleSaveButton = () => {
        if (isSaleValid()) {
            const saleObject = {
                id: saleId,
                buyer: sale[0].buyer,
                event: { id: sale[0].event },
                donation: sale[0].donation,
                items: sale[0].items.map(item => { return { item: { id: item.id }, amount: item.amount } })
            };
            updateSale(saleObject)
            .then(_ => toast.success('Venda alterada com sucesso!'))
            .then(_ => history.push('/sales'))
            .catch(_ => toast.error('Erro ao alterar venda'));
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
            {sale[0].event ? <SaleForm sale={sale} eventChangeDisabled /> : null}
            <ActionsContainer>
                <Button variant="contained" color="success" endIcon={<Check />} onClick={handleSaveButton}>
                    Salvar
                </Button>
                <Button variant="contained" color="error" endIcon={<Clear />} onClick={handleCancelButton}>
                    Cancelar
                </Button>
            </ActionsContainer>
        </>
    );
};

export default UpdateSale;