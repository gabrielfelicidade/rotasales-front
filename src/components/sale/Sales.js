import { useEffect, useMemo, useState } from "react"
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";

import { deleteSale, getSalesBySellerId, updateSale } from '../../services/SaleService';
import CreateSaleModal from "./CreateSaleModal";
import Sale from "./Sale";

import { toast } from 'react-toastify';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [show, setShow] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const salesMap = useMemo(() => sales ? sales.reduce((acc, act, i) => { acc[act.id] = i; return acc }, {}) : null, [sales]);

    useEffect(() => {
        if (forceUpdate || !show) {
            setForceUpdate(false);
            getSalesBySellerId()
                .then(sales => {
                    setSales(sales);
                })
                .catch(_ => toast.error('Erro ao recuperar suas vendas'))
        }
    }, [show, forceUpdate]);

    const changeItemHandler = (saleId, item, itemIndex) => {
        const sale = { ...sales[salesMap[saleId]] };
        const saleItem = sale.items.filter(i => i.item.id === item.id);
        const itemAlreadyExists = saleItem.length > 0;

        if (itemAlreadyExists) {
            saleItem[0].amount = parseInt(saleItem[0].amount) + parseInt(sale.items[itemIndex].amount);
            sale.items.splice(itemIndex, 1);
        } else {
            sale.items[itemIndex] = {
                ...sale.items[itemIndex],
                item: item
            };
        }
        setSales(sales.map((s) => s.id === saleId ? sale : s));
    }

    const changeAmountHandler = (saleId, itemIndex, event) => {
        const sale = { ...sales[salesMap[saleId]] };
        sale.items[itemIndex] = {
            ...sale.items[itemIndex],
            amount: event.target.value === "" ? 1 : parseInt(event.target.value) <= 0 ? 1 : parseInt(event.target.value)
        };
        setSales(sales.map((s) => s.id === saleId ? sale : s));
    }

    const removeItemHandler = (saleId, itemIndex) => {
        const sale = { ...sales[salesMap[saleId]] };
        sale.items.splice(itemIndex, 1);
        setSales(sales.map((s) => s.id === saleId ? sale : s));
    }

    const addItemHandler = (saleId) => {
        const sale = { ...sales[salesMap[saleId]] };
        sale.items.push(
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
        setSales(sales.map((s) => s.id === saleId ? sale : s));
    }

    const saveButtonHandler = (saleId) => {
        const hasErrors = sales[salesMap[saleId]].items.reduce((acm, act) => (act.amount <= 0 || act.item.id === '') || acm, false) || sales[salesMap[saleId]].items.length === 0;
        if (!hasErrors) {
            updateSale(sales[salesMap[saleId]])
                .then(_ => toast.success('Venda salva com sucesso!'))
                .catch(_ => toast.error('Erro ao salvar venda'));
        } else {
            toast.error('Preencha todos os campos corretamente!');
        }
    }

    const deleteButtonHandler = (saleId) => {
        deleteSale(saleId)
            .then(_ => setForceUpdate(true))
            .then(_ => toast.success('Venda excluída com sucesso!'))
            .catch(_ => toast.error('Erro ao excluir venda'));
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleRegisterSell = () => setShow(true);

    return (
        <div>
            <CreateSaleModal
                show={show}
                onHide={handleClose}
            />
            <Container fluid className="my-4">
                <Row>
                    <Col sm><h1>Minhas Vendas</h1></Col>
                    <Col sm className="text-right"><Button variant="success" onClick={handleRegisterSell}>Registrar Venda</Button></Col>
                </Row>
            </Container>
            <Accordion>
                {sales.map(sale =>
                    <Sale
                        key={sale.id}
                        sale={sale}
                        onSaveClick={saveButtonHandler}
                        onDeleteClick={deleteButtonHandler}
                        changeItemHandler={changeItemHandler}
                        changeAmountHandler={changeAmountHandler}
                        removeItemHandler={removeItemHandler}
                        addItemHandler={addItemHandler} />
                )}
            </Accordion>
        </div>
    );
}

export default Sales;