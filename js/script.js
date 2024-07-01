// Private variable to hold the pokemonList array!!
const pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 7 },
    { name: 'Charmander', type: ['Fire'], height: 6 },
    { name: 'Squirtle', type: ['Water'], height: 5 },
    { name: 'Pikachu', type: ['Electric'], height: 4 },
    { name: 'Snorlax', type: ['Normal'], height: 21 },
    // Add more Pokémon objects here as needed
  ];

  function addListItem(pokemon) {
    const pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: function() {
      return pokemonList;
    },
    add: function(pokemon) {
      if (typeof pokemon === 'object' && pokemon !== null) {
        const expectedKeys = ['name', 'type', 'height'];
        const keys = Object.keys(pokemon);
        const isValidPokemon = expectedKeys.every(key => keys.includes(key));
        if (isValidPokemon) {
          pokemonList.push(pokemon);
          return true;
        } else {
          console.error('Invalid Pokémon object. Please provide an object with the following keys: name, type, height');
          return false;
        }
      } else {
        console.error('Invalid argument. Please provide a valid Pokémon object.');
        return false;
      }
    },
    findByName: function(name) {
      return pokemonList.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    },
    addListItem: addListItem
  };
})();

function displayPokemonList() {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
}

displayPokemonList();
