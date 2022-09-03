const displayContainer = document.querySelector(".display-container");
const title = document.querySelector(".word");
const definition = document.querySelector(".definition");
const pronunciationContainer = document.querySelector(".pronunciation");
const synonymHeader = document.querySelector(".synonym-header");
const synonymList = document.querySelector(".synonym-list");

const handleFetch = async (word) => {
  const json = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  ).then((res) => res.json());
  console.log(json);
  if (
    json.message ===
    "Sorry pal, we couldn't find definitions for the word you were looking for."
  ) {
    alert("The entry could not be found. Please search another word");
  } else {
    distributeJson(json);
  }
};
const distributeJson = (dictJson) => {
  const word = dictJson[0].word;
  const arrOfDefs = dictJson[0].meanings;
  const writtenPhonetic = dictJson[0].phonetic;
  const audioPhonetic = dictJson[0].phonetics[0].audio;
  const synonymList = dictJson[0].meanings[0].synonyms;

  updateDefinition(word, arrOfDefs);
  updateAudio(writtenPhonetic, audioPhonetic);
  updateSynonyms(synonymList);
};

const mapDefinitions = (definitionArr) => {
  definition.innerHTML = ``;
  definitionArr.map((defObj) => {
    const def = defObj.definitions[0].definition;
    const listItem = document.createElement("li");
    listItem.innerHTML = `<li class="definition-item">${def}</li>`;
    definition.appendChild(listItem);
  });
};

const updateDefinition = (word, definitionArr) => {
  title.innerText = `${word}:`;

  mapDefinitions(definitionArr);
};

const updateAudio = (str, linkStr) => {
  pronunciationContainer.innerHTML = ``;
  pronunciationContainer.innerHTML = `<h6 class="pronunciation">Pronunciation: ${
    str === undefined ? "" : str
  }</h6>
  <audio class="audio" src="${linkStr}" controls></audio>`;
};

const mapSynonyms = (synArr) => {
  synonymList.innerHTML = ``;
  synArr.map((synonym) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<li class="synonym-list-item">${synonym}</li>`;
    synonymList.appendChild(listItem);
  });
};

const updateSynonyms = (synArr) => {
  synonymHeader.innerText = `Synonym`;

  mapSynonyms(synArr);
};

const handle = async (e) => {
  if (e.keyCode === 13) {
    const searchWord = e.target.value;
    handleFetch(searchWord);
    displayContainer.classList.remove("hidden");
  }
};
