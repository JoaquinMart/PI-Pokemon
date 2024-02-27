const { getPokemonIdController } = require('../controllers/getPokemonID');

const getPokemonIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getPokemonIdController(id);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
    };
};

module.exports = {
    getPokemonIdHandler
};