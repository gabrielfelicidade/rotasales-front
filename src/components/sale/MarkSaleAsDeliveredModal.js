import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { changeSaleStatus } from "../../services/SaleService";

const listStyle = {
    color: 'rgba(0, 0, 0, 0.6)'
};

const MarkSaleAsDeliveredModal = ({ open, sale, handleClose, handleUpdateRows }) => {
    const [updating, setUpdating] = useState(false);

    const handleUpdate = async () => {
        if (updating === false) {
            changeSaleStatus(sale.id, 'WITHDRAWN')
                .then(_ => toast.success('Venda atualizada com sucesso!'))
                .then(_ => { if(handleUpdateRows) handleUpdateRows() })
                .catch(err => toast.error(`Erro ao atualizar a venda, mensagem: ${err.response.data.reason}`))
                .finally(_ => {
                    setUpdating(false);
                    handleClose();
                });
        }
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Entrega de Venda</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deseja realmente sinalizar a venda para o cliente {sale.customer} que contém os itens abaixo como entregue?
                </DialogContentText>
                <List sx={listStyle}>
                    {sale.items.map(item =>
                        <ListItem key={item.description}>
                            <ListItemText primary={`${item.amount} - ${item.description}`} />
                        </ListItem>)}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleUpdate}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MarkSaleAsDeliveredModal;