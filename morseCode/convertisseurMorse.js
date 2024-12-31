import { alphabet, reverseAlphabet } from "./dictionnaire.js";
console.log(reverseAlphabet);

document.addEventListener('DOMContentLoaded', () => {
  const htmlInput = document.getElementById('saisie');
  const htmlOutput = document.getElementById('rendu');
  const toggleButton = document.getElementById('toggle');

  let isEncoding = true;

  function encodeMorse(text) {
    text = text.toUpperCase();
  
    let morseCode = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (alphabet[char]) {
        morseCode += alphabet[char] + " ";
      } else {
        morseCode += alphabet["?"] + " ";
      }
    }
  
    return morseCode.trim();
  }

  function decodeMorse(text){
    let splitTxt = text.split(" ");
    let decodedText = "";

    for (let i = 0; i < splitTxt.length; i++){
      let character = splitTxt[i];
      
      if((reverseAlphabet[character])){
        console.log(reverseAlphabet[character]);
        decodedText += reverseAlphabet[character];
      }else{
        decodedText += "?";
      }
    }

    return decodedText;
  }

  function majOutput() {
    const text = htmlInput.value;
    if (isEncoding) {
      htmlOutput.textContent = encodeMorse(text);
    } else {
      htmlOutput.textContent = decodeMorse(text);
    }
  }

  function toggleMode() {
    isEncoding = !isEncoding;
    htmlInput.placeholder = isEncoding ? "Write your text in Latin alphabet here" : "Write your Morse code here";
    toggleButton.textContent = isEncoding ? "Morse -> Latin" : "Latin -> Morse";
    majOutput();
  }

  htmlInput.addEventListener('input', majOutput);
  toggleButton.addEventListener('click', toggleMode);

  toggleButton.textContent = "Morse -> Latin";
});
