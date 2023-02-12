let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = $(".pokemon-list");
    let listpokemon = $('<li class = "group-list-item"></li>');

    let button = $(`<button type = "button" class = "button-class btn btn-primary" data-toggle = "modal" data-target = "#pokemonModalContainer">${pokemon.name}</button>`);
    button.on("click", function (event) {
      showDetails(pokemon);
    });
    listpokemon.append(button);
    pokemonList.append(listpokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showDetailsModal(pokemon);
    });
  }

  function showDetailsModal(pokemon) {
    let types = "";
    pokemon.types.forEach(function (type) {
      types += type.type.name + " ";
    });

    let modalBody = $(".modal-body");
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.empty();

    modalTitle.append(pokemon.name);
    modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
    modalBody.append(`<p>Height: ${pokemon.height}</p>`);
    modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);
    modalBody.append(`<p>Types: ${types}</p>`);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {

      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetailsModal: showDetailsModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
