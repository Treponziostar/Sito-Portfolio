/*
  script.js — logica JavaScript del portfolio

  Qui scriverai tu il codice. Idee di funzionalità (vedi PIANO.md per i dettagli):
  - menu di navigazione responsive (apertura/chiusura su mobile)
  - dark mode toggle con salvataggio della preferenza
  - filtro/ricerca sui progetti
  - eventuali animazioni leggere on-scroll
  - validazione del form contatti (se presente)
*/

// Dati del carosello: un oggetto per foto (percorso, testo alternativo, punto di focus per il ritaglio CSS)
const sliderImages = [
  {
    src: "asset/fotoValencia.jpg",
    alt: "foto mia a valencia",
    position: "center 30%",
  },
  {
    src: "asset/fotoSportBasket.jpg",
    alt: "foto mentre gioco a basket",
    position: "center 7%",
  },
];

let currentIndex = 0;

const slider = document.getElementById("slider");
const sliderDots = document.getElementById("sliderDots");

const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");

// Genera un <img> nel DOM per ciascuna foto dell'array
sliderImages.forEach((image) => {
  const img = document.createElement("img");
  img.setAttribute("src", image.src);
  img.setAttribute("alt", image.alt);
  img.style.objectPosition = image.position;
  slider.appendChild(img);
});

sliderImages.forEach((image, i) => {
  const dot = document.createElement("button");
  sliderDots.appendChild(dot);
  dot.addEventListener("click", () => {
    currentIndex = i;
    sliderUpdate()
  });
});

// Funzione centrale: mostra solo l'immagine di currentIndex e aggiorna il contatore
function sliderUpdate() {
  const images = slider.querySelectorAll("img");
  const sliderCounter = document.getElementById("sliderCounter");
  images.forEach((img, i) => {
    if (currentIndex === i) {
      img.classList.add("active");
      sliderCounter.textContent = `${currentIndex + 1} / ${sliderImages.length}`;
    } else {
      img.classList.remove("active");
    }
  });
  const dots = sliderDots.querySelectorAll("button");
  dots.forEach((dot, i) => {
    if (currentIndex === i) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

sliderUpdate();

const sliderPrev = document.getElementById("slider-prev");
const sliderNext = document.getElementById("slider-next");

// Foto precedente, con avvolgimento circolare (dalla prima torna all'ultima)
function prev() {
  currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;

  sliderUpdate();
}

sliderPrev.addEventListener("click", prev);

// Foto successiva, con avvolgimento circolare (dall'ultima torna alla prima)
function next() {
  currentIndex = (currentIndex + 1) % sliderImages.length;

  sliderUpdate();
}

sliderNext.addEventListener("click", next);

// Sincronizza il bottone tema con lo stato già applicato dallo script nell'<head> al caricamento
function dataTheme() {
  if (document.documentElement.getAttribute("data-theme") === "light") {
    themeToggle.setAttribute("aria-checked", "true");
    themeToggle.setAttribute("aria-label", "Attiva tema scuro");
  }
}

dataTheme();

// Inverte il tema al click e salva la scelta in localStorage
function toggleTheme() {
  const currentlyChecked = themeToggle.getAttribute("aria-checked");
  if (currentlyChecked === "true") {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-label", "attiva modalità chiara");
    themeToggle.setAttribute("aria-checked", "false");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.setAttribute("aria-label", "attiva modalità scura");

    themeToggle.setAttribute("aria-checked", "true");
    localStorage.setItem("theme", "light");
  }
}

themeToggle.addEventListener("click", toggleTheme);

// Apre/chiude il menu laterale invertendo aria-expanded (il CSS reagisce a questo attributo)
function expandNav() {
  const expanded = navToggle.getAttribute("aria-expanded");
  if (expanded === "true") {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "chiudi menu di navigazione");
  } else {
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "apri menu di navigazione");
  }
}

navToggle.addEventListener("click", expandNav);
