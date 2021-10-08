import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

const listStyle = {
    color: 'rgba(0, 0, 0, 0.6)'
};

const MarkSaleAsDeliveredModal = ({ open, sale, handleClose }) => {
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
                <Button variant="contained" color="primary">Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MarkSaleAsDeliveredModal;