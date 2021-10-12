import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import QrReader from "react-web-qr-reader";
import { getSaleById } from "../../services/SaleService";
import MarkSaleAsDeliveredModal from "./MarkSaleAsDeliveredModal";

const QRCodeModal = ({ open, handleClose }) => {
    const [scanning, setScanning] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const [scannedSale, setScannedSale] = useState(null);

    const handleScan = (data) => {
        if (scanning === false && data) {
            setScanning(true);
            getSaleById(data.data)
                .then(res => setScannedSale(res))
                .then(_ => setOpenModal(true))
                .catch(_ => toast.error('Erro ao escanear venda, tente novamente.'))
                .finally(_ => setScanning(false));
        }
    }
    const handleError = (_) => {
        toast.error('Erro inesperado ao iniciar o leitor de QRCode!');
    }

    return (
        <>
            {openModal === true
                ? <MarkSaleAsDeliveredModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    sale={scannedSale} />
                : null}
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Marcar venda como entregue (QRCode)</DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <QrReader
                        delay={1500}
                        style={{ height: '90%', margin: 'auto' }}
                        onError={handleError}
                        onScan={handleScan}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default QRCodeModal;