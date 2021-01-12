import { useEffect, useMemo, useState } from "react"
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";

import { deleteSale, getSalesBySellerId, updateSale } from '../../services/SaleService';
import CreateSaleModal from "./CreateSaleModal";
import Sale from "./Sale";

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [show, setShow] = useState(false);
    const salesMap = useMemo(() => sales.reduce((acc, act, i) => { acc[act.id] = i; return acc }, {}), [sales]);

    useEffect(() => {
        let isActive = true;

        getSalesBySellerId()
            .then(sales => {
                if (isActive) {
                    setSales(sales);
                }
            })
            .catch(error => console.log(error))

        return () => {
            isActive = false;
        }
    }, []);

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
                item: item,
                unitaryValue: item.value
            };
        }
        setSales(sales.map((s) => s.id === saleId ? sale : s));
    }

    const changeAmountHandler = (saleId, itemIndex, event) => {
        const sale = { ...sales[salesMap[saleId]] };
        sale.items[itemIndex] = {
            ...sale.items[itemIndex],
            amount: parseInt(event.target.value)
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
                    id: ''
                },
                sale: {
                    id: saleId
                },
                amount: 0,
                unitaryValue: 0
            }
        );
        setSales(sales.map((s) => s.id === saleId ? sale : s));
    }

    const saveButtonHandler = (saleId) => {
        updateSale(sales[salesMap[saleId]]).then(sale => console.log(sale));
    }

    const deleteButtonHandler = (saleId) => {
        deleteSale(saleId).then(sale => console.log(sale));
    }

    const handleClose = () => setShow(false);

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