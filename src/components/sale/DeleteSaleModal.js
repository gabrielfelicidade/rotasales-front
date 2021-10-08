import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeleteSaleModal = ({ open, sale, handleClose }) => {
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
                <Button variant="contained" color="error">Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteSaleModal;