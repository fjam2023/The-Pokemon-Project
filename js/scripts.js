let pokemonRepository = (function(){
  let pokemonList=[
    {
      name:"vileplume",
      height:1.2, 
      type:['grass', 'poison']
    },
    {
      name:"metapod", 
      height:0.7, 
      type:"bug"
    },
    {
      name:"wartortle", 
      height:1, 
      type:"water"
    }
  ]

 function getAll () {
    return pokemonList;
  }
  function add (pokemon) {
    pokemonList.push(pokemon);
  }

function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class"); 
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);

}

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
    }
})()

pokemonRepository.getAll().forEach(function(pokemon){
 pokemonRepository.addListItem(pokemon);

 
});
