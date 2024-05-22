const Production = require('../../Model/Betail/ProductionModel');

exports.getByMonthAndYear = async (req, res) => {
    try {
        const { idAgriculteur,idAnimal, month, year } = req.params;
        const production = await Production.findOne({ idAgriculteur,idAnimal, month, year });
        res.json(production);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    const { idAgriculteur, idAnimal, month, year, data,productionTotal } = req.body;

    try {
        let production = await Production.findOne({ idAgriculteur,idAnimal, month, year });

        if (production) {
            // Si une production existe déjà pour le mois et l'année spécifiés,
            // mettez à jour les données existantes.
            production.data = data;
            production.productionTotal= productionTotal;
        } else {
            // Sinon, créez une nouvelle production.
            production = new Production({
                idAgriculteur,
                idAnimal,
                month,
                year,
                data,
                productionTotal
            });
        }

        const newProduction = await production.save();
        res.status(201).json(newProduction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        await Production.findByIdAndDelete(id);
        res.json({ message: 'Production supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.all = async (req, res) => {
    const { idAgriculteur, idAnimal } = req.params;

    try {
        // Fetch productions for the specified idAgriculteur and idAnimal
        let allProductions = await Production.find({ idAgriculteur, idAnimal }).populate('idAnimal');

        // Création d'un objet pour stocker les données par année et par idAnimal
        const groupedProductions = {};

        allProductions.forEach(production => {
            const { year } = production;
            const animalId = idAnimal.toString(); // Convertir l'idAnimal en chaîne de caractères
            if (!groupedProductions[animalId]) {
                groupedProductions[animalId] = {
                    idAnimal: production.idAnimal, // Use the populated idAnimal
                    productions: {} // Initialiser un objet vide pour stocker les données de production par année
                };
            }
            if (!groupedProductions[animalId].productions[year]) {
                groupedProductions[animalId].productions[year] = [];
            }
            groupedProductions[animalId].productions[year].push({
                month: production.month,
                productionTotal: production.productionTotal
            }); // Ajouter les données de production à la liste correspondante de l'idAnimal et de l'année
        });

        res.json(Object.values(groupedProductions)); // Convertir l'objet en tableau avant de renvoyer la réponse
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.StatLitirarire = async (req, res) => {
    const { idAgriculteur, idAnimal, year, month } = req.params;

    try {
        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);

        let productions = await Production.find({ idAgriculteur, idAnimal, year: yearNum, month: monthNum }).populate('idAnimal');

        if (!productions.length) {
            return res.status(404).json({ message: 'No productions found for the given criteria' });
        }

        const dailyProductions = productions.flatMap(production =>
            production.data.map(dayData => ({
                day: dayData.day,
                quantite: dayData.quantite,
                prix: dayData.prix,
                total: dayData.total
            }))
        );

        // Calculate days in month based on production data
        const daysInMonth = productions.reduce((totalDays, production) => totalDays + production.data.length, 0);

        // Grouping by weeks
        const weeks = [];
        for (let i = 0; i < daysInMonth; i++) {
            const weekIndex = Math.floor(i / 7);
            if (!weeks[weekIndex]) {
                weeks[weekIndex] = { semaine: `Semaine ${weekIndex + 1}`, days: [] };
            }
            const productionForDay = dailyProductions[i] || { day: i + 1, quantite: 0, prix: 0, total: 0 };
            weeks[weekIndex].days.push(productionForDay);
        }

        const result = {
            idAgriculteur,
            idAnimal: productions[0].idAnimal,
            year: yearNum,
            month: monthNum,
            weeks
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 





