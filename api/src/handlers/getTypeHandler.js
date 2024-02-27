const { getTypesController } = require('../controllers/getType');

const getTypesHandler = async (req, res) => {
    try {
        const response = await getTypesController();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getTypesHandler
};