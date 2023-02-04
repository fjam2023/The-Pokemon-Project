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
  ];

pokemonList.forEach(function(pokemon){
  document.write(pokemon.name+" "+"(height:"+pokemon.height+")");
  if(pokemon.height>1.0){
    document.write("-Wow, that's big! "+"<br>");
  } else{
    document.write(" "+"<br>");
  }
});




  