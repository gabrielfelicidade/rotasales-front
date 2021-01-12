import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { formatCurrency } from "../../utils/FormatUtils";
import { getItems } from '../../services/ItemService';

const Item = () => {
    const [items, setItems] = useState([]);

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
    }, []);

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.description}</td>
                        <td>{formatCurrency(item.value)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Item;