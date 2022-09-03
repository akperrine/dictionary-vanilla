const title = document.querySelector(".word-title");
const definition = document.querySelector(".definition");
const pronunciation = document.querySelector(".pronunciation");
const audio = document.querySelector(".audio");
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
  console.log(dictJson[0].meanings);
  const word = dictJson[0].word;
  const arrOfDefs = dictJson[0].meanings;
  const writtenPhonetic = dictJson[0].phonetic;
  const audioPhonetic = dictJson[0].phonetics[0].audio;

  updateDefinition(word, arrOfDefs);
  pronunciation.innerText = `Pronunciation: ${writtenPhonetic}`;
  audio.src = audioPhonetic;
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

const handle = async (e) => {
  if (e.keyCode === 13) {
    const searchWord = e.target.value;
    handleFetch(searchWord);
  }
};
