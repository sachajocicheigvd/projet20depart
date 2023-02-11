let allPokemon = [];
let allPokemon2 = [];
let searchBarButton = document.querySelector("form input[type=submit]")
let searchbarTxt = document.querySelector("form input[type=text]")


let container = document.querySelector(".container")

async function getPokemon() { // async keyword allows usage of await in the function and means function returns a promise
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`); // Execution is paused here until the Promise returned by fetch is resolved
    return response.json();
}

getPokemon()
    .then(rep => {
        for (let i = 0; i < rep.results.length; i++) {
          fetch(rep.results[i].url)
              .then(rep2 => rep2.json())
              .then(rep2 =>{
                  allPokemon.push([rep2.name, rep2.types[0].type.name, rep2.sprites.front_default, rep2.id])

                  afficheElement(i)
              })
        }

console.log(allPokemon)
        }
    ).catch(err => console.log(err)) ; // if an error is thrown in our async function, we will catch it here


searchbarTxt.addEventListener('keyup', (e)=>{
    e.preventDefault();
    container.innerHTML='';
    allPokemon2 = allPokemon.filter(pokemon => pokemon[0].startsWith(searchbarTxt.value));

    for (let i = 0; i < allPokemon2.length; i++) {
        container.insertAdjacentHTML("beforeend", `<div class="carrePokemon ${allPokemon2[i][1]}"><img src="${allPokemon2[i][2]}" alt=""><h3>${allPokemon2[i][0]}</h3><p>ID#${allPokemon2[i][3]}</p></div>`)

    }




})

function afficheElement(i){


    container.insertAdjacentHTML("beforeend", `<div class="carrePokemon ${allPokemon[i][1]}"><img src="${allPokemon[i][2]}" alt=""><h3>${allPokemon[i][0]}</h3><p>ID#${allPokemon[i][3]}</p></div>`)


}