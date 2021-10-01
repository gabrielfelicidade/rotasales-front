import { Edit } from "@mui/icons-material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import NumberFormat from "react-number-format";

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

const EditButton = ({ saleId }) => {
    const onClick = () => {
        alert('Editing ' + saleId);
    };

    return (
        <Edit onClick={onClick} />
    )
};

const SalesGrid = () => {
    const rows = [
        { id: 1, event: 'Hello', buyer: 'World', totalValue: 23.50, donation: false, status: 'WITHDRAWN' },
        { id: 2, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'WITHDRAWN' },
        { id: 3, event: 'Hello', buyer: 'World', totalValue: 1.10, donation: false, status: 'WITHDRAWN' },
        { id: 4, event: 'Hello', buyer: 'World', totalValue: 1, donation: false, status: 'WITHDRAWN' },
        { id: 5, event: 'Hello', buyer: 'World', totalValue: 23.50, donation: false, status: 'WITHDRAWN' },
        { id: 6, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'WITHDRAWN' },
        { id: 7, event: 'Hello', buyer: 'World', totalValue: 1.10, donation: false, status: 'WITHDRAWN' },
        { id: 8, event: 'Hello', buyer: 'World', totalValue: 1, donation: false, status: 'WITHDRAWN' },
        { id: 9, event: 'Hello', buyer: 'World', totalValue: 23.50, donation: false, status: 'WITHDRAWN' },
        { id: 10, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'WITHDRAWN' },
    ];

    const columns = [
        { field: 'event', flex: 1, headerName: 'Evento' },
        { field: 'buyer', flex: 1, headerName: 'Comprador' },
        {
            field: 'totalValue',
            flex: 1,
            headerName: 'Valor Total',
            renderCell: (params) => {
                return (
                    <NumberFormat value={params.value} decimalSeparator="," thousandSeparator="." displayType={'text'} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true} />
                );
            }
        },
        { field: 'donation', flex: 1, headerName: 'Doação' },
        { field: 'status', flex: 1, headerName: 'Status' },
        {
            field: '',
            headerName: '',
            flex: 0.5,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            disableReorder: true,
            sortable: false,
            renderCell: (params) => {
                return (
                    <EditButton saleId={params.row.id} />
                )
            }
        },
    ];

    return (
        <div style={{ height: 650, width: '100%', marginTop: '2rem' }}>
            <StyledDataGrid disableSelectionOnClick={true} disableColumnSelector={true} rows={rows} columns={columns} />
        </div>
    );
};

export default SalesGrid;