import { toast } from 'react-toastify'
import { changeSaleStatus } from '../../services/SaleService'
import QrReader from 'react-web-qr-reader'

const QRCodeReader = () => {

    const handleScan = (data) => {
        if (data) {
            changeSaleStatus(data.data, 'DELIVERED')
                .then(_ => toast.success('Venda atualizada com sucesso!'))
                .catch(error => toast.error(`Erro ao atualizar a venda: ${error.response.data.error}`));
        }
    }
    const handleError = (_) => {
        toast.error('Erro inesperado ao atualizar a venda!');
    }

    const previewStyle = {
        width: '90vw'
    };

    return (
        <QrReader
            delay={1500}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
        />
    );
}

export default QRCodeReader;