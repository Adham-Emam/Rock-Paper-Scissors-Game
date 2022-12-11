// Rules Popup
let rulesButton = document.querySelector(".rules");

rulesButton.addEventListener("click", () => {
  let overlay = document.createElement("div");
  overlay.className = "overlay";

  overlay.addEventListener("click", () => {
    rules.remove();
    overlay.remove();
  });

  let rules = document.createElement("div");
  rules.className = "popup";

  let deleteRules = document.createElement("i");
  deleteRules.classList.add("fa-solid");
  deleteRules.classList.add("fa-x");

  deleteRules.addEventListener("click", () => {
    rules.remove();
    overlay.remove();
  });

  let rulesTitle = document.createElement("h2");
  rulesTitle.textContent = "Rules";

  let rulesImg = document.createElement("img");
  rulesImg.setAttribute("src", "./images/image-rules.svg");

  rules.appendChild(rulesTitle);
  rules.appendChild(deleteRules);
  rules.appendChild(rulesImg);
  document.body.append(overlay);
  document.body.append(rules);
});

// Start game
let score = document.querySelector(".score span");
let gameContainer = document.querySelector(".game");
let scissors = document.querySelector(".scissors");
let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");

function createPaper(parent) {
  let div = document.createElement("div");
  div.className = "paper";

  let icon = document.createElement("img");
  icon.src = `images/icon-paper.svg`;

  div.appendChild(icon);
  parent.appendChild(div);
}

function createScissors(parent) {
  let div = document.createElement("div");
  div.className = "scissors";

  let icon = document.createElement("img");
  icon.src = `images/icon-scissors.svg`;

  div.appendChild(icon);
  parent.appendChild(div);
}

function createRock(parent) {
  let div = document.createElement("div");
  div.className = "rock";

  let icon = document.createElement("img");
  icon.src = `images/icon-rock.svg`;

  div.appendChild(icon);
  parent.appendChild(div);
}

scissors.addEventListener("click", (el) => {
  startGame(scissors.className);
});
rock.addEventListener("click", (el) => {
  startGame(rock.className);
});
paper.addEventListener("click", (el) => {
  startGame(paper.className);
});

let result = document.querySelector(".result");
let final = document.querySelector(".final");
let myPick = document.querySelector(".my-pick");
let computerPick = document.querySelector(".computer-pick");

function startGame(pick) {
  gameContainer.remove();

  let yourPickTitle = document.createElement("h3");
  yourPickTitle.textContent = "you picked";

  myPick.appendChild(yourPickTitle);

  if (pick === "rock") {
    createRock(myPick);
  } else if (pick === "scissors") {
    createScissors(myPick);
  } else if (pick === "paper") {
    createPaper(myPick);
  }

  let computerPickTitle = document.createElement("h3");
  computerPickTitle.textContent = "Computer Picked";
  computerPick.appendChild(computerPickTitle);

  let blank = document.createElement("div");
  blank.className = "blank";

  computerPick.appendChild(blank);
  generateComputerPick(blank, pick);
}

let choicesArray = ["scissors", "rock", "paper"];

function generateComputerPick(blank, myPick) {
  let randomIndex = Math.floor(Math.random() * choicesArray.length);
  let randomPick = choicesArray[randomIndex];

  setTimeout(() => {
    blank.remove();

    if (randomPick === "rock") {
      createRock(computerPick);
    } else if (randomPick === "scissors") {
      createScissors(computerPick);
    } else if (randomPick === "paper") {
      createPaper(computerPick);
    }

    // Win Chances
    if (myPick === "paper" && randomPick === "rock") {
      won();
    } else if (myPick === "scissors" && randomPick === "paper") {
      won();
    } else if (myPick === "rock" && randomPick === "scissors") {
      won();
    }
    // Draw Chances
    if (myPick === "paper" && randomPick === "paper") {
      draw();
    } else if (myPick === "scissors" && randomPick === "scissors") {
      draw();
    } else if (myPick === "rock" && randomPick === "rock") {
      draw();
    }
    // lose Chances
    if (myPick === "paper" && randomPick === "scissors") {
      lost();
    } else if (myPick === "scissors" && randomPick === "rock") {
      lost();
    } else if (myPick === "rock" && randomPick === "paper") {
      lost();
    }
  }, 1000);
}

score.innerHTML = 0;
function won() {
  let h2 = document.createElement("h2");
  h2.textContent = "You Won";
  h2.className = "won";

  let reloadButton = document.createElement("button");
  reloadButton.textContent = "PLay Again";
  reloadButton.addEventListener("click", () => window.location.reload());

  final.appendChild(h2);
  final.appendChild(reloadButton);

  document.querySelector(".my-pick div").classList.add("winner");

  // Score
  score.innerHTML++;

  window.localStorage.setItem("score", score.innerHTML);
}
// Saved Score
window.addEventListener("load", () => {
  if (window.localStorage.getItem("score")) {
    score.innerHTML = window.localStorage.getItem("score");
  }
});

function draw() {
  let h2 = document.createElement("h2");
  h2.textContent = "Draw";

  let reloadButton = document.createElement("button");
  reloadButton.textContent = "PLay Again";
  reloadButton.addEventListener("click", () => window.location.reload());

  final.appendChild(h2);
  final.appendChild(reloadButton);
}

function lost() {
  let h2 = document.createElement("h2");
  h2.textContent = "You Lost";
  h2.className = "lost";

  let reloadButton = document.createElement("button");
  reloadButton.textContent = "PLay Again";
  reloadButton.addEventListener("click", () => window.location.reload());

  final.appendChild(h2);
  final.appendChild(reloadButton);

  document.querySelector(".computer-pick div").classList.add("winner");
}
