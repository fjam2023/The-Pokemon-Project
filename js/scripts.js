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

  for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name+" "+"(height:"+pokemonList[i].height+")");
    
    if(pokemonList[i].height>1.0){
      document.write("-Wow, that's big! "+"<br>");
    } else{
      document.write(" "+"<br>");
    }

  }


  