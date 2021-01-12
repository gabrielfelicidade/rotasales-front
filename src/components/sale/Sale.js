import { Accordion, Button, Card } from "react-bootstrap";

import SaleItems from "./SaleItems";

const Sale = (props) => {

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
                    <div className="text-right">
                        <Button className="mr-3" variant="danger" onClick={() => props.onDeleteClick(props.sale.id)}>Excluir</Button>
                        <Button onClick={() => props.onSaveClick(props.sale.id)}>Salvar</Button>
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )

}

export default Sale;