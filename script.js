// Importerar funktionerna getKey och getPlanets.
import { getKey, getPlanets } from "./api.js";


// DOM-element
let firstPageContainer = document.querySelector(".first-page-container");
let popupContainer = document.querySelector(".popup-container");
let planets = document.querySelectorAll(".planet");
let resetPage = document.querySelector("#medium");
let figuresAside = document.querySelectorAll("aside figure");

// Värden från början
let originalDisplayFirstPage = firstPageContainer.style.display;
let originalDisplayPopup = popupContainer.style.display;
let originalBackground = document.body.style.background;

// Data
let planetData = []; 
let originalColors = [];
let savedColor;


// Klick-lyssnare för varje planet, byter färg, bakgrund och container.
planets.forEach(planet => {
  planet.addEventListener("click", () => {
    
    let style = window.getComputedStyle(planet);
    let color = style.backgroundColor;

    savedColor = color;

    let figuresAside = document.querySelectorAll("aside figure");
    figuresAside.forEach(figure => {
      figure.style.backgroundColor = savedColor;
    });

    document.body.style.background = 'none';
    document.body.style.backgroundImage = 'url(Assets/star1.png)';

    firstPageContainer.style.display = "none";
    popupContainer.style.display = "flex";
  });
});


// Hämtar planetdata från API och uppdaterar planet med rätt info.
getKey('POST', '/keys').then(key => {
  return getPlanets('GET', '/bodies', key);
}).then(data => {
  planetData = data.bodies;

  planets.forEach(planet => {
    planet.addEventListener("click", () => {
      const planetId = planet.id;
      const selectedPlanet = planetData.find(p => p.name == planetId); //Jämför planetens namn med id i arrayen.

      if (selectedPlanet) {
        document.getElementById("name").innerText = selectedPlanet.name;
        document.getElementById("latinName").innerText = selectedPlanet.latinName;
        document.getElementById("desc").innerText = selectedPlanet.desc;
        document.getElementById("circumference").innerText = selectedPlanet.circumference.toLocaleString() + " km"; //Delar upp 1000
        document.getElementById("distance").innerText = selectedPlanet.distance.toLocaleString() + " km";
        document.getElementById("tempday").innerText = selectedPlanet.temp.day + "C";
        document.getElementById("tempnight").innerText = selectedPlanet.temp.night + "C";
        document.getElementById("moons").innerText = selectedPlanet.moons.join("\n"); //Konverterar array till sträng med radbrytningar
      }

      firstPageContainer.style.display = "none";
      popupContainer.style.display = "flex";
    });
  });
}).catch(error => {
  console.error('Error fetching data:', error);
});


// Återställ sida med ursprungliga färger och bakgrund.
figuresAside.forEach(figure => {
  originalColors.push(window.getComputedStyle(figure).backgroundColor);
});

resetPage.addEventListener("click", () => {
figuresAside.forEach((figure, index) => {
  figure.style.backgroundColor = originalColors[index];
});

firstPageContainer.style.display = originalDisplayFirstPage;
popupContainer.style.display = originalDisplayPopup;
document.body.style.background = originalBackground;
});








