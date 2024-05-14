const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Définir le répertoire temporaire pour stocker les fichiers PDF générés
const tempDirPath = path.resolve(__dirname, 'temp');

// Vérifier si le répertoire temporaire existe, sinon le créer
if (!fs.existsSync(tempDirPath)) {
    fs.mkdirSync(tempDirPath);
}

//Route pour générer et télécharger le PDF
exports.postPDF = async (req, res) => {
    try {
        const { imgData } = req.body;
        //console.log(imgData)
        const imgBuffer = Buffer.from(imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');

        // Create a new PDF document
        const doc = new PDFDocument();
        
        // Add a page to the PDF document
        doc.image(imgBuffer, {
                fit: [400, 300], // Image dimensions in the PDF
                align: 'center', // Image alignment
                valign: 'center' // Vertical alignment of the image
            });

        // Set the response headers to indicate a PDF file download
        res.setHeader('Content-Disposition', 'attachment; filename="facture.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        // doc.on('finish', () => {
        //     console.log('PDF generation complete');
        //     res.end(); // Call doc.end() only after finishing
        //   });
        // Pipe the PDF document buffer to the response stream
         doc.pipe(res);

        // // Finalize the PDF document
         doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
};

// Route pour télécharger le PDF
exports.DownloadPDF = (req, res) => {
    try {
        const {filePath} = req.body;
        console.log(filePath)       
        const fullPath = path.resolve(__dirname, 'temp', filePath);
        res.download(fullPath);
    } catch (error) {
        console.error('Erreur lors du téléchargement du PDF :', error);
        res.status(500).send('Erreur lors du téléchargement du PDF');
    }
};
