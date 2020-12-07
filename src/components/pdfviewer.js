import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
function Pdfviewer() {
    return (
        <div style={{width:"80%",marginLeft:'auto',marginRight:'auto'}}>
        <PDFViewer
        document={{
            url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
        }}
    />
        </div>
    )
}

export default Pdfviewer
