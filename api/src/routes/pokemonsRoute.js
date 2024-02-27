const {Router} = require("express");
const router = Router();
const { postPokemonHandler } = require('../handlers/postPkHandler');
const {getPokemonHandler} = require('../handlers/getPkHandler');
const { getPokemonIdHandler } = require('../handlers/getPkId');

router.get('/',  getPokemonHandler);

router.get('/:id', getPokemonIdHandler);

router.post('/create', postPokemonHandler);

module.exports = router;