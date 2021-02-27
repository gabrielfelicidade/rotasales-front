import { Document, Image, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import logo from '../../assets/logo.png';

var QRCode = require('qrcode');

const Receipt = (props) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E4E4E4',
            alignItems: 'center'
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            margin: 10,
            padding: 10
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    useEffect(() => {
        if (!qrCodeUrl) {
            getQrCodeUrl();
        }
    }, []);

    const getQrCodeUrl = async () => setQrCodeUrl(await QRCode.toDataURL('teste'));

    if(!qrCodeUrl) return (<div>Loading...</div>);

    return (
        <PDFViewer style={{width: '100%', minHeight: '800px'}}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Image src={logo} style={{width: 171, height: 60, margin: 0}} />
                </View>
                <View style={styles.header}>
                    <Text>Comprador: Feliz</Text>
                </View>
                <View style={styles.section}>
                    <Image src={{uri: qrCodeUrl }} style={{height: '250px', width: '250px'}} />
                </View>
            </Page>
        </Document>
        </PDFViewer>
    )
}

export default Receipt;