/*
* Skapa en webbsida där du använder:

* navigator objektet. 
   - Skapa 3 knappar som gör vardera:
      - Skriver ut appName
      - Skriver ut geolocation (longitude och latitude)
      - Skriver ut texten som finns i clipboard (alltså det som finns där i när du gjort Ctrl-c / Command-c)
      
* Skapa en funktion som returnerar ett Promise som både resolvar och rejectar.
 - Kör din Promise-funktion med async/await och skriv ut vad den resolvar. 
 - Kör din Promise-funktion när den resolvar och skriv ut på sajten mha .then()
 - Kör din Promise-funktion när den rejectar och skriv ut på sajten mha .catch()

* Prettier för att autoformattera koden.
* Ingenting får skrivas ut i konsolen!
* Använd beskrivande variabel- och funktionsnamn.
*/
const clipboardButton = document.querySelector("#clipboard-info");
let locationButton = document.querySelector("#geolocation");
let appNameButton = document.querySelector("#appname");
let display = document.querySelector(".display");
const nAgt = navigator.userAgent;

(function () {
  function error(err) {
    display.innerHTML = `ERROR(${err.code}): ${err.message}`;
  }

  async function success(pos) {
    let crd = await pos.coords;

    display.innerText = `Your current position is: \n Long: ${crd.longitude} \n Lat: ${crd.latitude}\n Accuracy is about: ${crd.accuracy} meters.`;
  }

  clipboardButton.addEventListener("click", () => {
    console.log(nAgt);
    if (nAgt.includes("Firefox")) {
      display.innerText =
        "you are using Firefox and cant get Clipboard from here";
    } else {
      navigator.clipboard
        .readText()
        .then((cutout) => {
          if (cutout === "") {
            display.innerText = "clipboard is empty";
          } else {
            display.innerText = cutout;
          }
        })
        .catch((err) => {
          display.innerHTML = err;
        });
    }
  });

  appNameButton.addEventListener("click", () => {
    display.innerHTML = navigator.appName;
  });

  locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(success, error);
    //heheh. something wierd huh?
  });
})();
