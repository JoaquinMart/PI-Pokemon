const axios = require("axios");
const { Types } = require('../db');

const getTypesController = async () => {
   const typesList = await Types.findAll();

   if (typesList.length === 0) {
      const { data } = await axios.get('https://pokeapi.co/api/v2/type');
      const typesApi = data.results.map((e) => ({ name: e.name }));
      // mapea los resultados de la api para luego crear un nuevo array con los objetos dentro

      await Types.bulkCreate(typesApi); // agregamos el array de objetos a nuestra API

      return typesApi;
   } else {
      return typesList;
   }
};


module.exports = {
   getTypesController
};