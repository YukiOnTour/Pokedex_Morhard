const pokemonRepository = (function() {
  let pokemonList = [];

  function add(pokemon) {
    if (typeof pokemon === 'object' && pokemon !== null) {
      const expectedKeys = ['name', 'detailsUrl'];
      const keys = Object.keys(pokemon);
      const isValidPokemon = expectedKeys.every(key => keys.includes(key));
      if (isValidPokemon) {
        pokemonList.push(pokemon);
        return true;
      } else {
        console.error('Invalid Pokémon object. Please provide an object with the following keys: name, detailsUrl');
        return false;
      }
    } else {
      console.error('Invalid argument. Please provide a valid Pokémon object.');
      return false;
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

  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      .then(response => response.json())
      .then(json => {
        json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(e => console.error(e));
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(response => response.json())
      .then(details => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(typeInfo => typeInfo.type.name);
      })
      .catch(e => console.error(e));
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
})();

function displayPokemonList() {
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  });
}

displayPokemonList();