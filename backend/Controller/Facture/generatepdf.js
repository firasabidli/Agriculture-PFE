
const PDFDocument = require('pdfkit');


exports.get=(req, res) => {
  const doc = new PDFDocument();

  // Ajoutez le contenu au PDF
  doc.text('Contenu du PDF généré depuis Node.js', 100, 100);

  // Envoyez le PDF généré en tant que réponse
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
  doc.pipe(res);
  doc.end();
};

