import { AddBusiness, QrCode } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const SalesActionsContainer = styled('div')({
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media(min-width: 601px)': {
        flexDirection: 'row',
        justifyContent: 'right',
    }
});

const SalesActions = () => {
    return <SalesActionsContainer>
        <Button variant="contained" color="primary" endIcon={<QrCode />}>
            Ler QRCode
        </Button>
        <Button variant="contained" color="success" endIcon={<AddBusiness />}>
            Cadastrar Venda
        </Button>
    </SalesActionsContainer>
};

export default SalesActions;