import { AddBusiness, QrCode } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import QRCodeModal from "./QRCodeModal";

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

    const [openQRCodeModal, setOpenQRCodeModal] = useState(false);
    const handleCloseQRCodeModal = () => setOpenQRCodeModal(false);
    const handleOpenQRCodeModal = () => setOpenQRCodeModal(true);

    return (
        <>
        <QRCodeModal open={openQRCodeModal} handleClose={handleCloseQRCodeModal} />
        <SalesActionsContainer>
            <Button variant="contained" color="primary" endIcon={<QrCode />} onClick={handleOpenQRCodeModal}>
                Ler QRCode
            </Button>
            <Button variant="contained" color="success" endIcon={<AddBusiness />}>
                Cadastrar Venda
            </Button>
        </SalesActionsContainer>
        </>
    )
};

export default SalesActions;