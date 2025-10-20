const spielDiv = document.querySelector(".spiel");

const bilder = [
     'A-ANALOG/000004760003.jpg', 'A-ANALOG/000004760003.jpg',
      'A-ANALOG/000004760005.jpg', 'A-ANALOG/000004760005.jpg',
      'A-ANALOG/000004760014.jpg', 'A-ANALOG/000004760014.jpg',
      'A-ANALOG/000004760022.jpg', 'A-ANALOG/000004760022.jpg',
      'A-ANALOG/000004760033.jpg', 'A-ANALOG/000004760033.jpg',
      'A-ANALOG/000009730001.jpg', 'A-ANALOG/000009730001.jpg',
      'A-ANALOG/000009730003.jpg',  'A-ANALOG/000009730003.jpg',
      'A-ANALOG/000062380002.jpg', 'A-ANALOG/000062380002.jpg',
      'A-ANALOG/000062380004.jpg', 'A-ANALOG/000062380004.jpg',
      'A-ANALOG/img14.jpg', 'A-ANALOG/img14.jpg',
      'A-ANALOG/img33.jpg', 'A-ANALOG/img33.jpg',
      'A-ANALOG/img036.jpg', 'A-ANALOG/img036.jpg',
      'A-ANALOG/img38.jpg', 'A-ANALOG/img38.jpg',
      'A-ANALOG/robin.jpg', 'A-ANALOG/robin.jpg',
      'A-ANALOG/rubina.jpg', 'A-ANALOG/rubina.jpg',
      'A-ANALOG/rubina2.jpg', 'A-ANALOG/rubina2.jpg',
];

// Mische die Bilder
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const gemischteBilder = shuffle([...bilder]);

// Erstellt das Spielfeld
function initSpiel() {
  gemischteBilder.forEach(bild => {
    const imgContainer = document.createElement("div");
    const imgElement = document.createElement("img");

    imgElement.src = bild;
    imgElement.className = "karte";
    imgContainer.className = "karte";

    imgContainer.appendChild(imgElement);
    spielDiv.appendChild(imgContainer);

    imgContainer.addEventListener("click", () => handleCardClick(imgContainer));
  });
}

let blockClicks = false; // Verhindert Mehrfachklicks

function handleCardClick(container) {
  if (blockClicks) return;
  if (container.classList.contains("flip") || container.classList.contains("match")) return;

  container.classList.add("flip");

  const offeneBoxen = document.querySelectorAll(".karte.flip:not(.match)");

  if (offeneBoxen.length === 2) {
    blockClicks = true;

    const [box1, box2] = offeneBoxen;
    const src1 = box1.querySelector("img").src;
    const src2 = box2.querySelector("img").src;

    setTimeout(() => {
      if (src1 === src2) {
        box1.classList.add("match");
        box2.classList.add("match");
      }

      box1.classList.remove("flip");
      box2.classList.remove("flip");

      // Wenn es ein Match war, bleiben die Karten sichtbar
      if (src1 === src2) {
        box1.classList.add("match");
        box2.classList.add("match");
      }

      // Gewinnbedingung prüfen
      const matched = document.querySelectorAll(".karte.match").length;
      if (matched === bilder.length) {
        alert("Oida geil");
      }

      blockClicks = false;
    }, 1000);
  }
}

initSpiel();
