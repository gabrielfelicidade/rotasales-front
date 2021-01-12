import { useEffect, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";

import { getItems } from "../../services/ItemService";
import { formatCurrency } from "../../utils/FormatUtils";
import { FaPlusCircle, FaTimes } from "react-icons/fa";

const SaleItems = (props) => {

    const [items, setItems] = useState([]);
    const itemsMap = useMemo(() => items.reduce((acc, act) => { acc[act.id] = act; return acc }, {}), [items])

    useEffect(() => {
        let isActive = true;

        getItems()
            .then(items => {
                if (isActive) {
                    setItems(items)
                }
            })
            .catch(error => console.log(error))

        return () => {
            isActive = false;
        }
    }, [props.sale]);

    return (
        <>
            <div className="text-right my-3 mr-3 w-100">
                <Button variant="success" onClick={() => props.addItemHandler(props.sale.id)}>
                    <FaPlusCircle />
                    <span className="ml-2">Incluir Item</span>
                </Button>
            </div>
            <Table striped bordered hover responsive="md">
                <thead>
                    <tr className="text-center">
                        <th>Item</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sale.items.map((saleItem, itemIndex) => (
                        <tr key={`${saleItem.item.description}_${itemIndex}`} className="text-center">
                            <td><select className="form-control" value={saleItem.item.id} onChange={event => props.changeItemHandler(props.sale.id, itemsMap[event.target.value], itemIndex)}>
                                <option disabled value={''}>Selecione uma opção</option>
                                {items.map((item, index) => <option key={`${item.id}_${index}`} value={item.id}>{item.description}</option>)}
                            </select></td>
                            <td><input className="form-control" type="number" value={saleItem.amount} onChange={event => props.changeAmountHandler(props.sale.id, itemIndex, event)} /></td>
                            <td>{formatCurrency(saleItem.amount * saleItem.unitaryValue)}</td>
                            <td><FaTimes onClick={() => props.removeItemHandler(props.sale.id, itemIndex)} /></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="text-right" colSpan="2">Total</td>
                        <td>{formatCurrency(props.sale.items.reduce((acc, item) => acc + (item.amount * item.unitaryValue), 0))}</td>
                    </tr>
                </tfoot>
            </Table>
        </>
    )
}

export default SaleItems;