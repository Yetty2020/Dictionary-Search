const search = document.getElementById("search");
const errorMessage = document.getElementById("error-message");

const fetchWord = () => {
  document.getElementById("result").innerHTML = "";
  const word = document.getElementById("inputword").value;
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  console.log(word);

  if (!word) {
    errorMessage.textContent = "Please enter a word";
    return;
  }

  fetch(apiUrl)
    .then((response) => {
      // console.log("res", response)
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })

    .then((data) => {
      console.log("data", data);
      let meanings = data[0].meanings;
      console.log("meanings", meanings);

      let wordInfo = document.createElement("div");
      wordInfo.innerHTML = `
      <h1>Definition of ${word}:</h1>
      <p>Phonetics: ${data[0].phonetics}</p>`;
      document.getElementById("result").appendChild(wordInfo);

      for (let y = 0; y < meanings.length; y++) {
        let defi = meanings[y].definitions;
        console.log("meanings", defi);
        console.log(meanings.length, "mngs length");
        console.log("meanings", meanings[y].partOfSpeech);

        console.log(defi.length);
        let Pos = document.createElement("div");
        Pos.innerHTML = `<p>Part of Speech: ${meanings[y].partOfSpeech}</p>
        `;
        document.getElementById("result").appendChild(Pos);

        for (let i = 0; i < defi.length; i++) {
          console.log("definitions", meanings[y].definitions[i]);
          let meaningDiv = document.createElement("div");
          meaningDiv.innerHTML = `
          
          
          <h2>Definition: ${meanings[y].definitions[i].definition}</h2>
          
          `;
          if (meanings[y].definitions[i].example) {
            meaningDiv.innerHTML += `<p>Example: ${meanings[y].definitions[i].example}</p>`;

            document.getElementById("result").appendChild(meaningDiv);
          }
        }
      }
    })

    .catch((error) => {
      errorMessage.textContent = `Error: ${error.message}`;
    });
};

search.addEventListener("click", fetchWord);
