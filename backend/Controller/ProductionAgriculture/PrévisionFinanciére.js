const Recolte = require('../../Model/ProductionAgriculture/historiqueRecolte');
const Equipement = require('../../Model/ProductionAgriculture/historiqueEquipement');
const Irrigation = require('../../Model/ProductionAgriculture/historiqueIrrugation');
const Engrais = require('../../Model/ProductionAgriculture/historiqueEngrais');
const MainOeuvre = require('../../Model/ProductionAgriculture/historiqueMainOeuvre');
const Stock = require('../../Model/ProductionAgriculture/GestionStocks');
const FicheAgriculture = require('../../Model/ProductionAgriculture/FicheAgriculture');
const ss = require('simple-statistics');

// exports.calculateGains = async (req, res) => {
//     try {
//         const { idAgriculteur } = req.params;

//         const fiches = await FicheAgriculture.find({ Agriculteur: idAgriculteur });

//         const cultureIds = fiches.map(fiche => fiche._id);

//         const equipements = await Equipement.find({ idCulture: { $in: cultureIds } });
//         const irrigations = await Irrigation.find({ idCulture: { $in: cultureIds } });
//         const engrais = await Engrais.find({ idCulture: { $in: cultureIds } });
//         const mainOeuvres = await MainOeuvre.find({ idCulture: { $in: cultureIds } });
//         const recoltes = await Recolte.find({ idCulture: { $in: cultureIds } });
//         const stocks = await Stock.find({ Agriculteur: idAgriculteur });

//         const totalEquipement = equipements.reduce((acc, item) => acc + item.prixTotalEq, 0);
//         const totalIrrigation = irrigations.reduce((acc, item) => acc + item.coutTotal, 0);
//         const totalEngrais = engrais.reduce((acc, item) => acc + item.prixTotalPro, 0);
//         const totalMainOeuvre = mainOeuvres.reduce((acc, item) => acc + item.prixTotal, 0);

//         let totalRevenuStock = 0;
//         let totalDepenseStock = 0;

//         stocks.forEach(stock => {
//             stock.entrées.forEach(entrée => {
//                 if (entrée.raisonEntrée.toLowerCase() === 'achat') {
//                     totalDepenseStock += entrée.quantitéEntrée * parseFloat(entrée.prix);
//                 }
//             });
//             stock.sortie.forEach(sortie => {
//                 if (sortie.raisonSortie.toLowerCase() === 'vente') {
//                     totalRevenuStock += sortie.quantitéSortie * parseFloat(sortie.prix);
//                 }
//             });
//         });

//         const totalRevenuRecolte = recoltes.reduce((acc, item) => acc + item.revenuTotal, 0);
//         const totalRevenu = totalRevenuRecolte + totalRevenuStock;
//         const totalCout = totalEquipement + totalIrrigation + totalEngrais + totalMainOeuvre + totalDepenseStock;
//         const gains = totalRevenu - totalCout;

//         res.json({ totalRevenu, totalCout, gains });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.predictRevenu = async (req, res) => {
//     try {
//         const { idAgriculteur } = req.params;

//         const fiches = await FicheAgriculture.find({ Agriculteur: idAgriculteur });
//         const cultureIds = fiches.map(fiche => fiche._id);

//         const recoltes = await Recolte.find({ idCulture: { $in: cultureIds } });

//         const historicalData = recoltes.map(recolte => ({
//             date: recolte.date,
//             revenu: recolte.revenuTotal
//         }));

//         const revenus = historicalData.map(item => item.revenu);
//         const dates = historicalData.map(item => new Date(item.date).getTime());

//         if (revenus.length < 2) {
//             return res.status(400).json({ message: 'Not enough data to make a prediction' });
//         }

//         const linearRegression = ss.linearRegression(dates.map((date, index) => [date, revenus[index]]));
//         const linearRegressionLine = ss.linearRegressionLine(linearRegression);

//         const nextDate = new Date().getTime();
//         const predictedRevenu = linearRegressionLine(nextDate);

//         res.json({ predictedRevenu, historicalData });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
exports.calculateAndPredict = async (req, res) => {
    try {
        const { idAgriculteur } = req.params;

        const fiches = await FicheAgriculture.find({ Agriculteur: idAgriculteur });
        const cultureIds = fiches.map(fiche => fiche._id);

        const equipements = await Equipement.find({ idCulture: { $in: cultureIds } });
        const irrigations = await Irrigation.find({ idCulture: { $in: cultureIds } });
        const engrais = await Engrais.find({ idCulture: { $in: cultureIds } });
        const mainOeuvres = await MainOeuvre.find({ idCulture: { $in: cultureIds } });
        const recoltes = await Recolte.find({ idCulture: { $in: cultureIds } });
        const stocks = await Stock.find({ Agriculteur: idAgriculteur });

        const totalEquipement = equipements.reduce((acc, item) => acc + item.prixTotalEq, 0);
        const totalIrrigation = irrigations.reduce((acc, item) => acc + item.coutTotal, 0);
        const totalEngrais = engrais.reduce((acc, item) => acc + item.prixTotalPro, 0);
        const totalMainOeuvre = mainOeuvres.reduce((acc, item) => acc + item.prixTotal, 0);

        let totalRevenuStock = 0;
        let totalDepenseStock = 0;

        stocks.forEach(stock => {
            stock.entrées.forEach(entrée => {
                if (entrée.raisonEntrée.toLowerCase() === 'achat') {
                    totalDepenseStock += entrée.quantitéEntrée * parseFloat(entrée.prix);
                }
            });
            stock.sortie.forEach(sortie => {
                if (sortie.raisonSortie.toLowerCase() === 'vente') {
                    totalRevenuStock += sortie.quantitéSortie * parseFloat(sortie.prix);
                }
            });
        });

        const totalRevenuRecolte = recoltes.reduce((acc, item) => acc + item.revenuTotal, 0);
        const totalRevenu = totalRevenuRecolte + totalRevenuStock;
        const totalCout = totalEquipement + totalIrrigation + totalEngrais + totalMainOeuvre + totalDepenseStock;
        const gains = totalRevenu - totalCout;

        const historicalData = recoltes.map(recolte => ({
            date: recolte.date,
            revenu: recolte.revenuTotal
        }));

        const revenus = historicalData.map(item => item.revenu);
        const dates = historicalData.map(item => new Date(item.date).getTime());

        if (revenus.length < 2) {
            return res.status(400).json({ message: 'Not enough data to make a prediction' });
        }

        const linearRegression = ss.linearRegression(dates.map((date, index) => [date, revenus[index]]));
        const linearRegressionLine = ss.linearRegressionLine(linearRegression);

        const nextDate = new Date().getTime();
        const predictedRevenu = linearRegressionLine(nextDate);

        res.json({ totalRevenu, totalCout, gains, predictedRevenu, historicalData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};