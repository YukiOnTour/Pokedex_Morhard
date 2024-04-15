// Private variable to hold the pokemonList array
const pokemonRepository =  (function(){
  // Define an array of Pokémon objects
  let pokemonList = [
  { name: 'Bulbasaur', type: ['Grass', ' Poison'], height: 7},
  { name: 'Charmander', type: ['Fire'], height: 6},
  { name: 'Squirtle', type:['Water'], height: 5},
  { name: 'Pikachu', type:['Electric'], height: 4},
  { name: 'Snorlax', type:['Normal'], height: 21},
  // Add more Pokémon objects here as needed
];
// Public functions to interact with the pokemonList array
return {
  getAll: function(){return pokemonList;
  },
  add: function(pokemon){
    // Check if the argument passed to the function is of type 'object' and not null
    if (typeof pokemon === 'object' && pokemon !== null){
       // Define an array of expected keys for a valid Pokémon object
      const expectedKeys = ['name', 'type', 'height'];
       // Extract all keys from the passed 'pokemon' object 
      const keys = Object.keys(pokemon);
       // Check if all expected keys are present in the 'pokemon' object
      const isValidPokemon = expectedKeys.every(key => keys.includes(key));
       // If the 'pokemon' object is valid, add it to the 'pokemonList' array     
      if (isValidPokemon) {
        pokemonList.push(pokemon);
      } else {
        // If the 'pokemon' object is not valid, log an error message
        console.error('Invalid Pokémon object. Please provide an object with the following keys: name, type, height');
      }
    } else {
      // If the argument is not an object or is null, log an error message
      console.error('Invalid argument. Please provide a valid Pokémon object.');
    }
  },
  findByName: function(name) {
    return pokemonList.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
  }
};
})();

// Usage examples:
console.log(pokemonRepository.getAll()); // should return the pokemonList array

pokemonRepository.add({ name: 'Mewtwo', type: ['Psychic'], height: 6 }); // adds a new Pokémon to the pokemonList array
console.log(pokemonRepository.getAll()); // should now include Mewtwo

console.log(pokemonRepository.findByName('Pikachu')); // should return the Pikachu object
console.log(pokemonRepository.findByName('Bulbasaur')); // should return the Bulbasaur object (case insensitive)
console.log(pokemonRepository.findByName('Charizard')); // should return undefined since Charizard is not in the list


// Loop through each Pokémon object in the array
for (let i = 0; i < pokemonList.length; i++) {
  const pokemon = pokemonList[i];
  
  // Write the Pokémon name, type, height and - Wow, that's big! to the DOM
  if (pokemon.height > 10) {
    document.write(`${pokemon.name} (Type: ${pokemon.type}) (Height: ${pokemon.height}) - Wow, that's big!<br>`);
  } else {
    document.write(`${pokemon.name} (Type: ${pokemon.type}) (Height: ${pokemon.height})<br>`);4
  }
} 

// Use a forEach() function instead of the for loop you have to iterate over the Pokémon in your pokemonList array in order to print the details of each one.
// pokemonList.forEach(function(pokemon){
//  console.log('Name: '+ pokemon.name +' '+'Type: '+ pokemon.type +' '+'Height: '+ pokemon.height)
// }); 

// Move the function declaration passed to forEach() to make things clearer 
function myLoopFunction(pokemon){
  console.log('Name: '+ pokemon.name +' '+'Type: '+ pokemon.type +' '+'Height: '+ pokemon.height)
};
pokemonList.forEach(myLoopFunction);

