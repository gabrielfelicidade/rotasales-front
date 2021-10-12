import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteSale } from "../../services/SaleService";

const DeleteSaleModal = ({ open, sale, handleClose, handleUpdateRows }) => {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (deleting === false) {
            deleteSale(sale.id)
                .then(_ => toast.success('Venda excluída com sucesso!'))
                .then(_ => { if(handleUpdateRows) handleUpdateRows() })
                .catch(_ => toast.error('Erro ao excluir a venda.'))
                .finally(_ => {
                    setDeleting(false);
                    handleClose();
                });
        }
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Excluir Venda</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deseja realmente excluir a venda para o cliente {sale.customer}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteSaleModal;