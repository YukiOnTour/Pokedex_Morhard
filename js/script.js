// scripts.js
const pokemonRepository = (function() {
  let pokemonList = [
    { name: 'Bulbasaur', type: ['Grass', 'Poison'], height: 7, imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'Charmander', type: ['Fire'], height: 6, imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Squirtle', type: ['Water'], height: 5, imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { name: 'Pikachu', type: ['Electric'], height: 4, imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { name: 'Snorlax', type: ['Normal'], height: 21, imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
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

    window.addEventListener('click', outsideClickListener);
    document.addEventListener('keydown', keydownListener);
  }

  function closeModal() {
    const modal = document.querySelector('#pokemon-modal');
    modal.style.display = 'none';

    window.removeEventListener('click', outsideClickListener);
    document.removeEventListener('keydown', keydownListener);
  }

  function outsideClickListener(event) {
    const modal = document.querySelector('#pokemon-modal');
    if (event.target === modal) {
      closeModal();
    }
  }

  function keydownListener(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
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

