import { PDFDownloadLink } from '@react-pdf/renderer';
import MyPdf from './MyPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';




function DownloadButton({ data, user }) {

    return (
        <>
            <PDFDownloadLink document={<MyPdf data={data} user={user} />} fileName="Prescription.pdf">
                {({ loading }) =>
                    loading ? 'Loading document...' : <Button variant='outlined'><DownloadIcon/></Button>
                }
            </PDFDownloadLink>
        </>
    )
}

export default DownloadButton