const { createPkController } = require('../controllers/createPokemon');

const postPokemonHandler = async (req, res) => {
    try {
        const { 
            name,
            types, 
            image,
            hp, 
            attack, 
            defense, 
            speed, 
            height, 
            weight 
        } = req.body;

        const response = await createPkController(
            name,
            types,  
            image, 
            hp, 
            attack, 
            defense, 
            speed,  
            height, 
            weight
            );

        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

module.exports = {
    postPokemonHandler
};