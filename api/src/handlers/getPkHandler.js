const { getPokemonController, getPokemonByQuery} = require('../controllers/getPokemon.js');

const getPokemonHandler = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const nameToLowerCase =  name.toLowerCase();
            const response = await getPokemonByQuery(nameToLowerCase);
            return res.status(200).json(response);

        } else {
            const response = await getPokemonController();
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(400).send('Pokemon not found');
    };
};

module.exports = {
    getPokemonHandler
};