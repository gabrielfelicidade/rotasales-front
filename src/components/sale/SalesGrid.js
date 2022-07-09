import { Delete, Edit, LocalShipping, Receipt } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { downloadReceipt, getSalesBySellerId } from "../../services/SaleService";
import DeleteSaleModal from "./DeleteSaleModal";
import MarkSaleAsDeliveredModal from "./MarkSaleAsDeliveredModal";
import { SaleStatus } from "./Sales";

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

const SalesGrid = ({ filterModel }) => {
    const history = useHistory();
    const [selectedSale, setSelectedSale] = useState(null);
    const [markSaleAsDeliveredModalOpen, setMarkSaleAsDeliveredModalOpen] = useState(false);
    const handleOpenMarkSaleAsDeliveredModal = () => setMarkSaleAsDeliveredModalOpen(true);
    const handleCloseMarkSaleAsDeliveredModal = () => setMarkSaleAsDeliveredModalOpen(false);
    const [deleteSaleModalOpen, setDeleteSaleModalOpen] = useState(false);
    const handleOpenDeleteSaleModal = () => setDeleteSaleModalOpen(true);
    const handleCloseDeleteSaleModal = () => setDeleteSaleModalOpen(false);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        let active = true;

        (async () => {
            const sales = await getSalesBySellerId(filterModel[0]);

            if (!active) {
                return;
            }

            setRows(sales.content);
            setRowCount(sales.total_elements);
        })();

        return () => {
            active = false;
        };
    }, [filterModel]);

    const columns = [
        {
            field: 'buyer',
            flex: 1,
            headerName: 'Comprador',
            minWidth: 150,
            disableColumnMenu: true,
            sortable: false,
        },
        {
            field: 'event',
            flex: 1,
            headerName: 'Evento',
            minWidth: 150,
            disableColumnMenu: true,
            sortable: false,
        },
        {
            field: 'total_value',
            flex: 1,
            headerName: 'Valor Total',
            minWidth: 145,
            disableColumnMenu: true,
            sortable: false,
            valueFormatter: ({ value }) => {
                return new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(value);
            }
        },
        {
            field: 'donation',
            flex: 1,
            headerName: 'Doação',
            minWidth: 125,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                return params.value ? "Sim" : "Não";
            }
        },
        {
            field: 'status',
            flex: 1,
            headerName: 'Status',
            minWidth: 150,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                return SaleStatus[params.value];
            }
        },
        {
            align: 'center',
            field: '',
            headerName: '',
            flex: 0.4,
            minWidth: 175,
            disableClickEventBubbling: true,
            disableColumnMenu: true,
            disableReorder: true,
            sortable: false,
            renderCell: (params) => {
                const row = params.row;

                return (
                    <>
                        <ReceiptButton sale={row} />
                        <EditButton sale={row} />
                        <DeleteButton sale={row} />
                        <DeliveryButton sale={row} />
                    </>
                )
            }
        },
    ];

    const ReceiptButton = ({ sale }) => {
        const onClick = () => {
            downloadReceipt(sale.id)
                .then(res => {
                    const file = new Blob(
                        [res.data],
                        { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                })
        };

        return (
            <Tooltip title="Visualizar Recibo">
                <IconButton onClick={onClick}>
                    <Receipt />
                </IconButton>
            </Tooltip>
        )
    };

    const EditButton = ({ sale }) => {
        const onClick = () => {
            history.push('/sales/edit', { id: sale.id });
        };

        return (
            <Tooltip title="Editar Venda">
                <IconButton onClick={onClick}>
                    <Edit />
                </IconButton>
            </Tooltip>
        )
    };

    const DeleteButton = ({ sale }) => {
        const onClick = () => {
            setSelectedSale(sale);
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

    const DeliveryButton = ({ sale }) => {
        const onClick = () => {
            setSelectedSale(sale);
            handleOpenMarkSaleAsDeliveredModal();
        };

        return (
            <>
                {sale.status !== 'DELIVERED'
                    ? <Tooltip title="Marcar como entregue">
                        <IconButton onClick={onClick}>
                            <LocalShipping />
                        </IconButton>
                    </Tooltip>
                    : null}
            </>
        )
    };

    const handleUpdateRows = () => {
        filterModel[1]({ ...filterModel[0] });
    }

    return (
        <>
            <div style={{ height: 650, width: '100%', marginTop: '2rem' }}>
                <StyledDataGrid
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick={true}
                    disableColumnSelector={true}
                    rows={rows}
                    columns={columns}
                    pagination
                    page={filterModel[0].page}
                    pageSize={10}
                    rowCount={rowCount}
                    paginationMode="server"
                    onPageChange={(newPage) => filterModel[1]({ ...filterModel[0], page: newPage })}
                    localeText={ptBR.props.MuiDataGrid.localeText} />
            </div>
            {markSaleAsDeliveredModalOpen === true
                ? <MarkSaleAsDeliveredModal
                    open={markSaleAsDeliveredModalOpen}
                    handleClose={handleCloseMarkSaleAsDeliveredModal}
                    sale={selectedSale}
                    handleUpdateRows={handleUpdateRows} />
                : null}
            {deleteSaleModalOpen === true
                ? <DeleteSaleModal
                    open={deleteSaleModalOpen}
                    handleClose={handleCloseDeleteSaleModal}
                    sale={selectedSale}
                    handleUpdateRows={handleUpdateRows} />
                : null}
        </>
    );
};

export default SalesGrid;