/// Variáveis do jogo
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let playerXWins = 0;
let playerOWins = 0;

function updateScoreboard() {
  playerXWins = LoadX();
  playerOWins = LoadO();
  document.getElementById("playerXWins").innerText = playerXWins;
  document.getElementById("playerOWins").innerText = playerOWins;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("clicked");
  }
  const messageElement = document.querySelector(".message");
  if (messageElement) {
    messageElement.remove();
  }

  updateScoreboard();
}

// Função para executar uma jogada do jogador
function handlePlayerMove(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  clickedCell.classList.add("clicked");

  if (checkWin(currentPlayer)) {
    endGame(false);
    if (currentPlayer === "X") {
      playerXWins++;
      SaveX()
    } else {
      playerOWins++;
      SaveO()
    }
   
    updateScoreboard();
  } else if (!gameState.includes("")) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O" && gameActive) {
      setTimeout(handleComputerMove, 500);
    }
  }
}

function SaveX()
{
  if (!localStorage.getItem("PlayerXwin"))
  {
    var XJSON = JSON.stringify(playerXWins);
    localStorage.setItem("PlayerXwin",XJSON)
  }
  else
  {
    var LoadedXJSON = localStorage.getItem("PlayerXwin");
    var loadedXObject = JSON.parse(LoadedXJSON);
    loadedXObject += 1;
    var LoadedXJSON = localStorage.setItem("PlayerXwin", loadedXObject);
  }
}

function SaveO()
{
   var OJSON = JSON.stringify(playerOWins);
   localStorage.setItem("PlayerOwin",OJSON)

}


function LoadX()
{
  
   var LoadedXJSON = localStorage.getItem("PlayerXwin");
   var loadedXObject = JSON.parse(LoadedXJSON);
  return loadedXObject;
}

function LoadO()
{
  
   var LoadedOJSON = localStorage.getItem("PlayerOwin");
   var loadedOObject = JSON.parse(LoadedOJSON);
   return loadedOObject

}

// Função para executar uma jogada da IA
function handleComputerMove() {
  const availableCells = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      availableCells.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const cellIndex = availableCells[randomIndex];
  const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
  handlePlayerMove(cell, cellIndex);
}

// Função para verificar se um jogador ganhou
function checkWin(player) {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (
      gameState[a] === player &&
      gameState[b] === player &&
      gameState[c] === player
    ) {
      return true;
    }
  }
  return false;
}

// Função para encerrar o jogo
function endGame(draw) {
  gameActive = false;
  const message = document.createElement("div");
  message.classList.add("message");
  if (draw) {
    message.innerText = "Empate!";
  } else {
    message.innerText = `${currentPlayer === "X" ? "X" : "O"} venceu!`;
  }
  document.body.appendChild(message);

  // Remove a mensagem após alguns segundos
  setTimeout(function() {
    message.remove();
  }, 3000);
}


// Função para reiniciar o jogo
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("clicked");
  }
  const messageElement = document.querySelector(".message");
  if (messageElement) {
    messageElement.remove();
  }
}


// Adiciona os listeners de clique às células
const cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (gameActive && gameState[i] === "") {
      handlePlayerMove(cells[i], i);
    }
  });
}

// Adiciona o listener de clique ao botão de resetar
document.getElementById("reset-button").addEventListener("click", resetGame);


