import React, { useEffect, useState } from 'react';

const PdfViewer = ({ mediaData }) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        if (mediaData) {
            // Convert the mediaData to a Blob and create a URL for the PDF
            const byteCharacters = atob(mediaData); // decode base64 string
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const pdfBlobUrl = window.URL.createObjectURL(blob);

            // Set the URL for rendering in iframe
            setPdfUrl(pdfBlobUrl);
        }
    }, [mediaData]);

    return (
        <div className=' mb-3 bg-gray-50 dark:bg-darkColor-700 object-cover rounded-lg block'>
            {pdfUrl ? (
                // Display the PDF in an iframe
                <iframe src={pdfUrl} className="w-full h-80 rounded-lg " title="PDF Viewer" />
            ) : (
                <p>No PDF data available</p>
            )}
        </div>
    );
};

export default React.memo(PdfViewer);
