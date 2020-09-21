const clipboardButton = document.querySelector("#clipboard-info");
let locationButton = document.querySelector("#geolocation");
let appNameButton = document.querySelector("#appname");
let display = document.querySelector(".display");
const nAgt = navigator.userAgent;
const backgroundImgButton = document.querySelector(".backgroundButton");

(function () {
  function error(err) {
    display.innerHTML = `ERROR(${err.code}): ${err.message}`;
  }

  backgroundLoader = () => {
    return new Promise((resolve, reject) => {
      let randomNumber = Math.floor(Math.random() * 8);
      
      if (randomNumber > 0 && randomNumber < 7) {
        resolve(randomNumber + ".jpg");
      } else {
        reject("0.jpg");
      }
    });
  };

  backgroundImgButton.addEventListener("click", () => backgroundChanger());

  async function backgroundChanger() {
    await backgroundLoader()
      .then((image) => {
        document.body.style.backgroundImage = `url(./img/${image})`;
      })
      .catch((image) => {
        document.body.style.backgroundImage = `url(./wrongimg/${image})`;
      });
  }

  async function success(pos) {
    let crd = await pos.coords;
    display.innerText = `Your current position is: \n Long: ${crd.longitude} \n Lat: ${crd.latitude}\n Accuracy is about: ${crd.accuracy} meters.`;
  }

  clipboardButton.addEventListener("click", () => {
    
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
    //heheh. something wierd huh?
  });

  locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(success, error);
  });
})();
