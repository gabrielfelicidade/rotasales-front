import { Delete, Edit, LocalShipping } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useState } from "react";
import NumberFormat from "react-number-format";
import DeleteSaleModal from "./DeleteSaleModal";
import MarkSaleAsDeliveredModal from "./MarkSaleAsDeliveredModal";
import { SaleStatus } from "./Sales";

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

const SalesGrid = () => {
    const [selectedSale, setSelectedSale] = useState(null);
    const [markSaleAsDeliveredModalOpen, setMarkSaleAsDeliveredModalOpen] = useState(false);
    const handleOpenMarkSaleAsDeliveredModal = () => setMarkSaleAsDeliveredModalOpen(true);
    const handleCloseMarkSaleAsDeliveredModal = () => setMarkSaleAsDeliveredModalOpen(false);
    const [deleteSaleModalOpen, setDeleteSaleModalOpen] = useState(false);
    const handleOpenDeleteSaleModal = () => setDeleteSaleModalOpen(true);
    const handleCloseDeleteSaleModal = () => setDeleteSaleModalOpen(false);

    const rows = [
        { id: 1, event: 'Hello', buyer: 'World', totalValue: 23.50, donation: false, status: 'WITHDRAWN' },
        { id: 2, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'WITHDRAWN' },
        { id: 3, event: 'Hello', buyer: 'World', totalValue: 1.10, donation: false, status: 'WITHDRAWN' },
        { id: 4, event: 'Hello', buyer: 'World', totalValue: 1, donation: true, status: 'WITHDRAWN' },
        { id: 5, event: 'Hello', buyer: 'World', totalValue: 23.50, donation: false, status: 'WITHDRAWN' },
        { id: 6, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'AWAITING_WITHDRAWAL' },
        { id: 7, event: 'Hello', buyer: 'World', totalValue: 1.10, donation: false, status: 'WITHDRAWN' },
        { id: 8, event: 'Hello', buyer: 'World', totalValue: 1, donation: false, status: 'WITHDRAWN' },
        { id: 9, event: 'Hello', buyer: 'World', totalValue: 23.50, donation: false, status: 'WITHDRAWN' },
        { id: 10, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'WITHDRAWN' },
        { id: 11, event: 'Hello', buyer: 'World', totalValue: 12.50, donation: false, status: 'WITHDRAWN' },
    ];

    const columns = [
        {
            field: 'event',
            flex: 1,
            headerName: 'Evento',
            minWidth: 150,
        },
        {
            field: 'buyer',
            flex: 1,
            headerName: 'Comprador',
            minWidth: 150,
        },
        {
            field: 'totalValue',
            flex: 1,
            headerName: 'Valor Total',
            minWidth: 145,
            renderCell: (params) => {
                return (
                    <NumberFormat value={params.value} decimalSeparator="," thousandSeparator="." displayType={'text'} prefix={'R$ '} decimalScale={2} fixedDecimalScale={true} />
                );
            }
        },
        {
            field: 'donation',
            flex: 1,
            headerName: 'Doação',
            minWidth: 125,
            renderCell: (params) => {
                return params.value ? "Sim" : "Não";
            }
        },
        {
            field: 'status',
            flex: 1,
            headerName: 'Status',
            minWidth: 150,
            renderCell: (params) => {
                return SaleStatus[params.value];
            }
        },
        {
            field: '',
            headerName: '',
            flex: 0.6,
            minWidth: 135,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            disableReorder: true,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <EditButton saleId={params.row.id} />
                        <DeleteButton saleId={params.row.id} />
                        <DeliveryButton saleId={params.row.id} />
                    </>
                )
            }
        },
    ];

    const EditButton = ({ saleId }) => {
        const onClick = () => {
            alert('Editing ' + saleId);
            setSelectedSale(saleId);
        };

        return (
            <Tooltip title="Editar Venda">
                <IconButton onClick={onClick}>
                    <Edit />
                </IconButton>
            </Tooltip>
        )
    };

    const DeleteButton = ({ saleId }) => {
        const onClick = () => {
            setSelectedSale(saleId);
            handleOpenDeleteSaleModal();
        };

        return (
            <Tooltip title="Excluir Venda">
                <IconButton onClick={onClick}>
                    <Delete />
                </IconButton>
            </Tooltip>
        )
    };

    const DeliveryButton = ({ saleId }) => {
        const onClick = () => {
            setSelectedSale(saleId);
            handleOpenMarkSaleAsDeliveredModal();
        };

        return (
            <Tooltip title="Marcar como entregue">
                <IconButton onClick={onClick}>
                    <LocalShipping />
                </IconButton>
            </Tooltip>
        )
    };

    return (
        <>
            <div style={{ height: 650, width: '100%', marginTop: '2rem' }}>
                <StyledDataGrid
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick={true}
                    disableColumnSelector={true}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    localeText={ptBR.props.MuiDataGrid.localeText} />
            </div>
            {markSaleAsDeliveredModalOpen === true
                ? <MarkSaleAsDeliveredModal
                    open={markSaleAsDeliveredModalOpen}
                    handleClose={handleCloseMarkSaleAsDeliveredModal}
                    saleId={selectedSale} />
                : null}
            {deleteSaleModalOpen === true
                ? <DeleteSaleModal
                    open={deleteSaleModalOpen}
                    handleClose={handleCloseDeleteSaleModal}
                    saleId={selectedSale} />
                : null}
        </>
    );
};

export default SalesGrid;