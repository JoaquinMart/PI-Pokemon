const axios = require("axios");
const { Pokemon, Types } = require('../db');

const getPokemonController = async () => {
        // Obtener todos los Pokémon de la API
        const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
        const apiPokemons = apiResponse.data.results;

        // Mapear los Pokémon de la API
        const apiDataPokemon = apiPokemons.map(async (e) => {
            const info = await axios.get(e.url);
            const pokemon = info.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map((p) => p.type.name),
                image: pokemon.sprites.other.home.front_default,
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height,
                weight: pokemon.weight
            };
        });

        const dbPokemons = await Pokemon.findAll({ // Obtener todos los Pokémon de la base de datos
            //busco en la tabla los modelos que necesito
            include:{
                model: Types,
                atributes: ["name"]
            }
    });
    
        const dbDataPokemon = dbPokemons.map((pokemon) => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.Types.map((t) => t.name),
                image: pokemon.image,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight
            };
        });

        // Esperar a que se resuelvan todas las promesas
        const apiPokemonsData = await Promise.all(apiDataPokemon);

        // Combinar ambos conjuntos de Pokémon
        const allPokemons = [...apiPokemonsData, ...dbDataPokemon];

        return allPokemons;
};

const getPokemonByQuery = async (nameToLowerCase) => {
    const getPokemon = await getPokemonController();

    const filter = getPokemon.filter((pokemon) => pokemon.name.includes(nameToLowerCase));

    const response = filter.map((pokemon) =>{
        return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                image: pokemon.image,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight
            }
    } );

    return response;
    
}
module.exports = {
    getPokemonController,
    getPokemonByQuery
};