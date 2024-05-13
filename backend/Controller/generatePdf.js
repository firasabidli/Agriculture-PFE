
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'invoices');


// Vérifiez si le répertoire existe, sinon créez-le
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}
exports.postPDF = (req,res) => {
    const pdfData = req.body;
    console.log('pdf',req.body)
    const filePath = path.resolve(__dirname, 'invoice.pdf');

    try {
        // Convertir l'objet PDF en chaîne JSON
        const pdfString = JSON.stringify(pdfData);
        // Convertir la chaîne JSON en Buffer
        const pdfBuffer = Buffer.from(pdfString);

        fs.writeFileSync(filePath, pdfBuffer);
        res.download(filePath, 'invoice.pdf', (err) => {
            if (err) {
                console.error('Erreur lors du téléchargement du PDF :', err);
                res.status(500).send('Erreur lors du téléchargement du PDF');
            }
            // Supprimer le fichier PDF après l'envoi
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Erreur lors de l\'écriture du fichier PDF:', error);
        res.status(500).send('Erreur lors de l\'écriture du fichier PDF');
    }
}