const Recolte = require('../../Model/ProductionAgriculture/historiqueRecolte');
const Equipement = require('../../Model/ProductionAgriculture/historiqueEquipement');
const Irrigation = require('../../Model/ProductionAgriculture/historiqueIrrugation');
const Engrais = require('../../Model/ProductionAgriculture/historiqueEngrais');
const MainOeuvre = require('../../Model/ProductionAgriculture/historiqueMainOeuvre');
const Stock = require('../../Model/ProductionAgriculture/GestionStocks');
const FicheAgriculture = require('../../Model/ProductionAgriculture/FicheAgriculture');
const ss = require('simple-statistics');
// fonction pour calcuer gains et prévision  
exports.calculateAndPredict = async (req, res) => {
    try {
        const { idAgriculteur, year } = req.params;

        if (!idAgriculteur || !year) {
            return res.status(400).json({ message: 'il n est pas trouver : idAgriculteur et annees' });
        }

        const selectedYear = parseInt(year, 10);
      // afficher id culture relier avec agriculteur
        const fiches = await FicheAgriculture.find({ Agriculteur: idAgriculteur });
        const cultureIds = fiches.map(fiche => fiche._id);

        const startDate = new Date(`${selectedYear}-01-01`);
        const endDate = new Date(`${selectedYear}-12-31`);

        // Filtrer les données par année et culture
        const equipements = await Equipement.find({ idCulture: { $in: cultureIds }, date: { $gte: startDate, $lte: endDate } }) || [];
        const irrigations = await Irrigation.find({ idCulture: { $in: cultureIds }, date: { $gte: startDate, $lte: endDate } }) || [];
        const engrais = await Engrais.find({ idCulture: { $in: cultureIds }, dateApplication: { $gte: startDate, $lte: endDate } }) || [];
        const mainOeuvres = await MainOeuvre.find({ idCulture: { $in: cultureIds }, dateTravail: { $gte: startDate, $lte: endDate } }) || [];
        const recoltes = await Recolte.find({ idCulture: { $in: cultureIds }, date: { $gte: startDate, $lte: endDate } }) || [];

        // Calculer les totaux
        const totalEquipement = equipements.reduce((acc, item) => acc + item.prixTotalEq, 0);
        const totalIrrigation = irrigations.reduce((acc, item) => acc + item.coutTotal, 0);
        const totalEngrais = engrais.reduce((acc, item) => acc + item.prixTotalPro, 0);
        const totalMainOeuvre = mainOeuvres.reduce((acc, item) => acc + item.prixTotal, 0);
    
        const totalRevenuRecolte = recoltes.reduce((acc, item) => {
            const surface = fiches.find(fiche => fiche._id.equals(item.idCulture)).surface;
            const rendement = item.balles.reduce((ballesAcc, ballesItem) => ballesAcc + ballesItem.nombreBalles, 0) +
                             item.quantites.reduce((quantitesAcc, quantitesItem) => quantitesAcc + quantitesItem.quantite, 0);
            return acc + (rendement * surface * item.revenuTotal);
        }, 0);

        // Ajouter prixSemence et prixTerrain
        const totalSemence = fiches.reduce((acc, fiche) => acc + fiche.prixSemence, 0);
        const totalTerrain = fiches.reduce((acc, fiche) => acc + fiche.prixTerrain, 0);

        // Calculer le coût total actuel
        const totalCout = totalEquipement + totalIrrigation + totalEngrais + totalMainOeuvre + totalSemence + totalTerrain;
        const gains = totalRevenuRecolte - totalCout;

        // Collecte de données historiques pour les revenus
        const historicalData = await Recolte.find({ idCulture: { $in: cultureIds } });
        const revenusParAnnee = historicalData.reduce((acc, item) => {
            const year = new Date(item.date).getFullYear();
            if (!acc[year]) {
                acc[year] = 0;
            }
            acc[year] += item.revenuTotal;
            return acc;
        }, {});

        const years = Object.keys(revenusParAnnee).map(year => parseInt(year));
        const revenus = Object.values(revenusParAnnee);

        // Collecte de données historiques pour les dépenses
        const historicalExpensesData = [
            ...equipements.map(item => ({ year: new Date(item.date).getFullYear(), cost: item.prixTotalEq })),
            ...irrigations.map(item => ({ year: new Date(item.date).getFullYear(), cost: item.coutTotal })),
            ...engrais.map(item => ({ year: new Date(item.dateApplication).getFullYear(), cost: item.prixTotalPro })),
            ...mainOeuvres.map(item => ({ year: new Date(item.dateTravail).getFullYear(), cost: item.prixTotal })),
            ...fiches.map(fiche => ({ year: new Date(fiche.datePlantation).getFullYear(), cost: fiche.prixSemence + fiche.prixTerrain }))
        ];

        const expensesByYear = historicalExpensesData.reduce((acc, item) => {
            if (!acc[item.year]) {
                acc[item.year] = 0;
            }
            acc[item.year] += item.cost;
            return acc;
        }, {});

        const expenseYears = Object.keys(expensesByYear).map(year => parseInt(year));
        const expenses = Object.values(expensesByYear);

        if (years.length < 2 ) {
            return res.status(400).json({ message: 'Not enough data to make a prediction' });
        }

        // Utilisation de la régression linéaire pour prédire le revenu
        const revenueLinearRegression = ss.linearRegression(years.map((year, index) => [year, revenus[index]]));
        const revenueLinearRegressionLine = ss.linearRegressionLine(revenueLinearRegression);

        const nextYear = selectedYear + 1;
        const predictedRevenu = revenueLinearRegressionLine(nextYear);

        // Utilisation de la régression linéaire pour prédire les dépenses
        const expenseLinearRegression = ss.linearRegression(expenseYears.map((year, index) => [year, expenses[index]]));
        const expenseLinearRegressionLine = ss.linearRegressionLine(expenseLinearRegression);

        const predictedExpenses = expenseLinearRegressionLine(nextYear);

        // Calcul des gains prévus
        const predictedGains = predictedRevenu - predictedExpenses;

        res.json({ totalRevenu: totalRevenuRecolte, totalCout, gains, predictedRevenu, predictedGains, predictedExpenses, historicalData: { revenus: revenusParAnnee, expenses: expensesByYear } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};