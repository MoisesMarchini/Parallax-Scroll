const cards_container = document.getElementById("cards_container");
const cards = document.getElementsByClassName("card");

let mouseDown = false;
let mouseMove = false;

let start_X = 0;
let last_X = 0;
let currentDistancePerc = 0;
let next_percentage = 0;
let distanceCalc = 0;
let max_X = window.innerWidth / 2;

let cardActive;
let cardActiveIndex = 0;
const containerWidth = cards_container.clientWidth;
const containerWidth1Perc = containerWidth / 100;
const cardWidth = cards.item(0).clientWidth;
let cardGap = 8;

window.addEventListener("pointerdown", (e) => {
  mouseDown = true;

  start_X = e.clientX;
});

window.addEventListener("pointermove", (e) => {
  if (!mouseDown | (cardActive != null)) return;
  e.preventDefault();

  mouseMove = true;
  last_X = e.x;

  let maxDistance = Math.min(start_X - last_X, max_X);
  currentDistancePerc = (maxDistance / max_X) * -100;

  currentDistancePerc = Math.min(currentDistancePerc, next_percentage * -1);

  distanceCalc = Math.min(
    Math.max(next_percentage + currentDistancePerc, -100),
    0
  );

  document.documentElement.style.setProperty(
    "--transform-positionX",
    `${distanceCalc}%`
  );
});

window.addEventListener("pointerup", (e) => {
  mouseDown = false;

  next_percentage = distanceCalc;
  last_X = start_X;

  setTimeout(() => {
    mouseMove = false;
  }, 200);
});

window.addEventListener("pointercancel", (e) => {
  mouseDown = false;

  next_percentage = distanceCalc;
  last_X = start_X;

  setTimeout(() => {
    mouseMove = false;
  }, 200);
});

for (let index = 0; index < cards.length; index++) {
  const card = cards[index];
  card.addEventListener("click", (e) => {
    if (mouseMove) return;
    cardActiveIndex = index;
    if (cardActive == card) {
      cardActive = undefined;
    } else cardActive = card;
    cardClickEvent(card);
  });
}

function cardClickEvent(card) {
  next_percentage = (100 / (cards.length - 1)) * cardActiveIndex * -1;

  if (card.classList.contains("active")) {
    card.classList.remove("active");
    document.documentElement.style.setProperty("--container-left", `50%`);
  } else {
    card.classList.add("active");
    document.documentElement.style.setProperty(
      "--container-left",
      `${next_percentage * -1}%`
    );
    document.documentElement.style.setProperty(
      "--transform-positionX",
      `${next_percentage}%`
    );
  }
}
