// scripts.js
const pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 7, imgUrl: 'path_to_bulbasaur_image' },
    { name: 'Charmander', type: ['Fire'], height: 6, imgUrl: 'path_to_charmander_image' },
    { name: 'Squirtle', type: ['Water'], height: 5, imgUrl: 'path_to_squirtle_image' },
    { name: 'Pikachu', type: ['Electric'], height: 4, imgUrl: 'path_to_pikachu_image' },
    { name: 'Snorlax', type: ['Normal'], height: 21, imgUrl: 'path_to_snorlax_image' },
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
    const modal = document.querySelector('#pokemon-modal');
    const modalName = modal.querySelector('.pokemon-name');
    const modalImage = modal.querySelector('.pokemon-image');
    const modalHeight = modal.querySelector('.pokemon-height');
    const modalType = modal.querySelector('.pokemon-type');

    modalName.innerText = pokemon.name;
    modalImage.src = pokemon.imgUrl;
    modalHeight.innerText = `Height: ${pokemon.height}`;
    modalType.innerText = `Type: ${pokemon.type.join(', ')}`;

    modal.style.display = 'block';

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function closeModal() {
    const modal = document.querySelector('#pokemon-modal');
    modal.style.display = 'none';
  }

  return {
    getAll: function() {
      return pokemonList;
    },
    add: function(pokemon) {
      if (typeof pokemon === 'object' && pokemon !== null) {
        const expectedKeys = ['name', 'type', 'height', 'imgUrl'];
        const keys = Object.keys(pokemon);
        const isValidPokemon = expectedKeys.every(key => keys.includes(key));
        if (isValidPokemon) {
          pokemonList.push(pokemon);
          return true;
        } else {
          console.error('Invalid Pokémon object. Please provide an object with the following keys: name, type, height, imgUrl');
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
