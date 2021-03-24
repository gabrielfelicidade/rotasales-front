import { Accordion, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { downloadReceipt } from "../../services/SaleService";

import SaleItems from "./SaleItems";

const Sale = (props) => {

    const downloadReceiptHandler = () => {
        downloadReceipt(props.sale.id)
            .then(res => {
                const blob = new Blob([res.data], { type: 'application/pdf' });
                const fileUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = fileUrl;
                a.download = `${props.sale.event.description} - ${props.sale.customer}.pdf`;
                a.click();
            })
            .catch(_ => toast.error('Erro ao realizar download do recibo'));
    }

    return (
        <Card key={props.sale.id}>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={props.sale.id}>
                    {`${props.sale.event.description} - ${props.sale.customer}`}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.sale.id}>
                <Card.Body>
                    <SaleItems
                        sale={props.sale}
                        changeItemHandler={props.changeItemHandler}
                        changeAmountHandler={props.changeAmountHandler}
                        removeItemHandler={props.removeItemHandler}
                        addItemHandler={props.addItemHandler} />
                    <div className="d-flex gap-3 justify-content-end mt-2">
                        <Button onClick={downloadReceiptHandler}>Baixar Comprovante</Button>
                        <Button className="mx-3" variant="danger" onClick={() => props.onDeleteClick(props.sale.id)}>Excluir</Button>
                        <Button onClick={() => props.onSaveClick(props.sale.id)}>Salvar</Button>
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )

}

export default Sale;