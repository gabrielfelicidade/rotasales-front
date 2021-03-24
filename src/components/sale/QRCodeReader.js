import { toast } from 'react-toastify'
import { changeSaleStatus } from '../../services/SaleService'
import QrReader from 'react-web-qr-reader'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useState } from 'react'

const QRCodeReader = () => {

    const [open, setOpen] = useState(false);
    const [saleId, setSaleId] = useState(null);

    const handleScan = (data) => {
        if (data) {
            setSaleId(data.data);
            setOpen(true);
        }
    }
    const handleError = (_) => {
        toast.error('Erro inesperado ao iniciar o leitor de QRCode!');
    }

    const previewStyle = {
        width: '90vw'
    };

    const handleUpdateSale = () => {
        changeSaleStatus(saleId, 'DELIVERED')
            .then(_ => toast.success('Pedido atualizado com sucesso!'))
            .catch(error => toast.error(`Erro ao atualizar o pedido: ${error.response.data.reason}`))
            .finally(_ => {
                setOpen(false);
                setSaleId(null);
            });
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Atualizar pedido</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja realmente sinalizar o pedido como 'ENTREGUE'?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Cancelar
          </Button>
                    <Button variant="contained" color="primary" onClick={handleUpdateSale}>
                        Confirmar
          </Button>
                </DialogActions>
            </Dialog>
            <QrReader
                delay={1500}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
        </>
    );
}

export default QRCodeReader;