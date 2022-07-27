const quizForm = document.querySelector("#quiz-form");
const checkButton = document.querySelector("#check-button");
const fetchButton = document.querySelector("#fetch-button");
const pokeName1 = document.querySelector("#pokemon-1");
const pokeName2 = document.querySelector("#pokemon-2");
const outputDiv = document.querySelector("#output");
const outputDivResult = document.querySelector("#output-result");
const pokeLabel1 = document.querySelector("#pokemon-label-1");
const pokeLabel2 = document.querySelector("#pokemon-label-2");
const pokeImage1 = document.querySelector("#image-1")
const pokeImage2 = document.querySelector("#image-2")
const OutputDivDisplay = document.querySelector(".div-output")

const serverURL = "https://pokeapi.co/api/v2/pokemon/";

function getFirstServerURL(num1) {
  pokeNum1 = serverURL + num1;
  return pokeNum1;
}

function getSecondServerURL(num2) {
  pokeNum2 = serverURL + num2;
  return pokeNum2;
}

checkButton.addEventListener("click", clickHandler);
fetchButton.addEventListener("click", fetchPokemon);

let pokemon1, pokemon2;
async function fetchPokemon() {
  let randomNum = getTwoRandomNum();
  pokemon1 = await getPokemon(randomNum[0], 0);


  pokemon2 = await getPokemon(randomNum[1], 1);

  setName(pokemon1, pokemon2);
  // pokeLabel1.innerText = pokemon1.name;
  // pokeLabel2.innerText = pokemon2.name;
  pokeImage1.src = pokemon1.image
  pokeImage2.src = pokemon2.image
}

fetchPokemon();
async function clickHandler() {
  let strongerPokemon = compareSpeed(pokemon1, pokemon2);
  outputDiv.innerText = "Faster Pokemon is " + strongerPokemon.name;
  checkQuiz(strongerPokemon);
}

function getTwoRandomNum() {
  num1 = Math.floor(Math.random() * 150 + 1);
  num2 = Math.floor(Math.random() * 150 + 1);

  return [num1, num2];
}

function compareSpeed(pokemon1, pokemon2) {
  if (pokemon1.speed > pokemon2.speed) {
    return pokemon1;
  } else {
    return pokemon2;
  }
}



async function getPokemon(num, pid) {
  let pokemon = fetch(getSecondServerURL(num))
    .then((resp) => resp.json())
    .then((json) => {
      speed = json.stats[5].base_stat;

      setOutput(num, json.name);
      poke = json.name;
      image = json.sprites.front_default
      

      let obj = { name: poke, speed: speed, pid: pid, image : image};
      return obj;
    });

  return pokemon;
}

function setOutput(id, name) {
  let outputStr = "";

  if (id === 1) {
    pokeName1.innerText = "First pokemon:" + name;
  } else if (id === 2) {
    pokeName2.innerText = "Second pokemon : " + name;
  }
}

function setName(pokemon1, pokemon2) {
  pokeName1.innerText = "First Pokemon : " + pokemon1.name;
  pokeName2.innerText = "Second Pokemon : " + pokemon2.name;
}

function checkQuiz(strongerPokemon) {
  const formResults = new FormData(quizForm);
  for (let value of formResults.values()) {
    if (value == strongerPokemon.pid) {
      outputDivResult.innerText = "You are correct";
      OutputDivDisplay.style.backgroundColor = "green"
      OutputDivDisplay.style.outline = "5px solid black"
    } else {
      outputDivResult.innerText = "You are wrong";
      OutputDivDisplay.style.backgroundColor = "red"
    }
  }
}
