const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonImage = document.getElementById("pokeImage");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-Id");
const pokemonWeight = document.getElementById("pokemon-Weight");
const pokemonTypes = document.getElementById("pokemon-Types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const searchPokedex = async () => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${userInput.value.toLowerCase()}`,
    );
    const data = await res.json();
    const { name, weight, height, id, stats, sprites, types } = data;
    pokemonName.innerHTML = name;
    pokemonId.innerHTML = `ID:${id}`;
    pokemonWeight.innerHTML = `Weight:${weight}`;
    pokemonTypes.innerHTML =
      "Types: " + types.map((t) => t.type.name.toUpperCase()).join(", ");

    pokemonImage.src = sprites.front_default;

    hp.innerHTML = stats[0].base_stat;
    attack.innerHTML = stats[1].base_stat;
    defense.innerHTML = stats[2].base_stat;
    specialAttack.innerHTML = stats[3].base_stat;
    specialDefense.innerHTML = stats[4].base_stat;
    speed.innerHTML = stats[5].base_stat;

    console.log(data);
  } catch (err) {
    alert("Pokemon not found");
    console.log(err.message);
  }
};

searchBtn.addEventListener("click", searchPokedex);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchPokedex();
  }
});

const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

let isPlaying = false;

/* ---------- TOGGLE BUTTON ---------- */
toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();

    toggleBtn.innerHTML =
      '<img width="25px" src="./assets/musicicon.png"> Music OFF';

    isPlaying = true;
  } else {
    music.pause();

    toggleBtn.innerHTML =
      '<img width="25px" src="./assets/musicicon.png"> Music ON';

    isPlaying = false;
  }
});

let pokemonList = [];
const suggestionsBox = document.getElementById("suggestions");

const loadPokemonNames = async () => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );
  const data = await res.json();

  pokemonList = data.results.map(p => p.name);
};

loadPokemonNames();
userInput.addEventListener("input", () => {
  const value = userInput.value.toLowerCase();

  suggestionsBox.innerHTML = "";

  if (!value) return;

  const matches = pokemonList
    .filter(name => name.startsWith(value))
    .slice(0, 6);

  matches.forEach(name => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = name;

    li.addEventListener("click", () => {
      userInput.value = name;
      suggestionsBox.innerHTML = "";
      searchPokedex();
    });

    suggestionsBox.appendChild(li);
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".position-relative")) {
    suggestionsBox.innerHTML = "";
  }
});
