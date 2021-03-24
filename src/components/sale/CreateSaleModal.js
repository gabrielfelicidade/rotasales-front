import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getActiveEvents } from "../../services/EventService";
import { createSale } from "../../services/SaleService";
import SaleItems from "./SaleItems";
import { toast } from 'react-toastify';

const CreateSaleModal = (props) => {

    const cleanState = { customer: '', event: { id: '' }, items: [] };

    const [sale, setSale] = useState({ ...cleanState });
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let isActive = true;

        getActiveEvents()
            .then(events => {
                if (isActive) {
                    setEvents(events);
                }
            })
            .catch(_ => toast.error('Erro ao recuperar os eventos ativos'))

        return () => {
            isActive = false;
        }
    }, []);

    const changeItemHandler = (_, item, itemIndex) => {
        const newSale = { ...sale };
        const saleItem = newSale.items.filter(i => i.item.id === item.id);
        const itemAlreadyExists = saleItem.length > 0;

        if (itemAlreadyExists) {
            saleItem[0].amount = parseInt(saleItem[0].amount) + parseInt(newSale.items[itemIndex].amount);
            newSale.items.splice(itemIndex, 1);
        } else {
            newSale.items[itemIndex] = {
                ...newSale.items[itemIndex],
                item: item
            };
        }
        setSale(newSale);
    }

    const changeAmountHandler = (_, itemIndex, event) => {
        const newSale = { ...sale };
        newSale.items[itemIndex] = {
            ...newSale.items[itemIndex],
            amount: event.target.value === "" ? 1 : parseInt(event.target.value) <= 0 ? 1 : parseInt(event.target.value)
        };
        setSale(newSale);
    }

    const removeItemHandler = (_, itemIndex) => {
        const newSale = { ...sale };
        newSale.items.splice(itemIndex, 1);
        setSale(newSale);
    }

    const addItemHandler = (saleId) => {
        const newSale = { ...sale };
        newSale.items.push(
            {
                item: {
                    id: '',
                    value: 0
                },
                sale: {
                    id: saleId
                },
                amount: 1
            }
        );
        setSale(newSale);
    }

    const changeCustomerHandler = (event) => {
        const newSale = { ...sale };
        newSale.customer = event.target.value;
        setSale(newSale);
    }

    const changeEventHandler = (event) => {
        const newSale = { ...sale };
        newSale.event = {
            id: event.target.value
        };
        setSale(newSale);
    }

    const isFormValid = () => {
        var hasErrors = sale.items.reduce((acm, act) => (act.amount <= 0 || act.item.id === '') || acm, false);
        if (sale.customer === '') hasErrors = true;
        if (sale.event.id === '') hasErrors = true;
        if (sale.items.length === 0) hasErrors = true;
        return !hasErrors;
    }

    const saveButtonHandler = () => {
        if (isFormValid()) {
            createSale(sale)
                .then(sale => {
                    onCloseHandler();
                    toast.success('Venda criada com sucesso!')
                })
                .catch(error => toast.error(`Erro ao criar venda: ${error.response.data.reason}`));
        } else {
            toast.error('Preencha todos os campos corretamente!');
        }
    }

    const onCloseHandler = () => {
        setSale({ ...cleanState });
        props.onHide();
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>Cadastrar Venda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Comprador *</Form.Label>
                            <Form.Control required type="text" value={sale.customer} onChange={event => changeCustomerHandler(event)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Evento *</Form.Label>
                            <Form.Control required as="select" value={sale.event.id} onChange={(event) => changeEventHandler(event)}>
                                <option disabled value={''}>Selecione uma opção</option>
                                {events ? events.map((event, index) => <option key={`${event.id}_${index}`} value={event.id}>{event.description}</option>) : null}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <SaleItems
                        sale={sale}
                        changeItemHandler={changeItemHandler}
                        changeAmountHandler={changeAmountHandler}
                        removeItemHandler={removeItemHandler}
                        addItemHandler={addItemHandler}
                    />
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseHandler}>Cancelar</Button>
                <Button variant="primary" onClick={saveButtonHandler}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateSaleModal;