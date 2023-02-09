let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  //from previous exercises
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  //the edited showDetails block includes MODAL now 
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = (item.name);

      let contentElement = document.createElement('p');
      contentElement.innerText = ('Height: ' + item.height + '\n' + '\n' + 'Types: ' + item.types);

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');


      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      document.querySelector('button.button-class').addEventListener('click', () => {
        showDetails('Modal Title', 'Modal Content');
      });
    });
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
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
