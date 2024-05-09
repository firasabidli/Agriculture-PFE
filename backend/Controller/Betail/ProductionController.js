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
    const { idAgriculteur } = req.params;

    try {
        let allProductions = await Production.find({ idAgriculteur }).populate('idAnimal');

        // Création d'un objet pour stocker les données par année et par idAnimal
        const groupedProductions = {};

        allProductions.forEach(production => {
            const { year, idAnimal } = production;
            const animalId = idAnimal._id.toString(); // Convertir l'idAnimal en chaîne de caractères
            if (!groupedProductions[animalId]) {
                groupedProductions[animalId] = {
                    idAnimal: idAnimal,
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






