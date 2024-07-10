const pokemonRepository = (function() {
  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList() {
    return fetch(apiUrl).then(response => {
      return response.json();
    }).then(json => {
      json.results.forEach(item => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(e => {
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(response => {
      return response.json();
    }).then(details => {
      // Add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types.map((typeInfo) => typeInfo.type.name);
    }).catch(e => {
      console.error(e);
    });
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && pokemon !== null) {
      const expectedKeys = ['name', 'detailsUrl'];
      const keys = Object.keys(pokemon);
      const isValidPokemon = expectedKeys.every(key => keys.includes(key));
      if (isValidPokemon) {
        pokemonList.push(pokemon);
      } else {
        console.error('Invalid Pokémon object. Please provide an object with the following keys: name, detailsUrl');
      }
    } else {
      console.error('Invalid argument. Please provide a valid Pokémon object.');
    }
  }

  function getAll() {
    return pokemonList;
  }

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
    loadDetails(pokemon).then(() => {
      const modal = document.getElementById('pokemon-modal');
      const modalContent = modal.querySelector('.modal-content');
      const nameElement = modalContent.querySelector('.pokemon-name');
      const heightElement = modalContent.querySelector('.pokemon-height');
      const imageElement = modalContent.querySelector('.pokemon-img');

      nameElement.innerText = pokemon.name;
      heightElement.innerText = `Height: ${pokemon.height}`;
      imageElement.src = pokemon.imageUrl;
      imageElement.alt = pokemon.name;

      modal.style.display = 'block';
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

function displayPokemonList() {
  pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  });
}

displayPokemonList();

// Close the modal when clicking the close button
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', () => {
  const modal = document.getElementById('pokemon-modal');
  modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('pokemon-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Close the modal when pressing the escape key
window.addEventListener('keydown', (event) => {
  const modal = document.getElementById('pokemon-modal');
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});
