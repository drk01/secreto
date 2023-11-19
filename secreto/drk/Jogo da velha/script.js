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
    } else {
      playerOWins++;
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

// Função para executar uma jogada da IA
function handleComputerMove() {
  const bestMove = minimax(gameState, currentPlayer).index;
  const cell = document.querySelector(`[data-cell-index="${bestMove}"]`);
  handlePlayerMove(cell, bestMove);
}

// Função Minimax para determinar a melhor jogada
function minimax(newGameState, player) {
  const availableMoves = getAvailableMoves(newGameState);

  if (checkWin("X", newGameState)) {
    return { score: -1 };
  } else if (checkWin("O", newGameState)) {
    return { score: 1 };
  } else if (availableMoves.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availableMoves.length; i++) {
    const move = {};
    move.index = availableMoves[i];
    newGameState[availableMoves[i]] = player;

    if (player === "O") {
      const result = minimax(newGameState, "X");
      move.score = result.score;
    } else {
      const result = minimax(newGameState, "O");
      move.score = result.score;
    }

    newGameState[availableMoves[i]] = "";
    moves.push(move);
  }

  let bestMove;
  if (player === "O") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// Função para obter as jogadas disponíveis
function getAvailableMoves(gameState) {
  const moves = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      moves.push(i);
    }
  }
  return moves;
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
    document.querySelectorAll(".cell").forEach(cell => {
      cell.innerText = "";
      cell.classList.remove("clicked");
    });
    document.querySelector(".message")?.remove();
  }
  
  
  // Adicione um listener de clique a cada célula
  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", function () {
      if (gameActive && cell.innerText === "") {
        handlePlayerMove(cell, cell.dataset.cellIndex);
      }
    });
  });
  
  // Adicione um listener de clique ao botão de "Reset"
  document.getElementById("reset-button").addEventListener("click", resetGame);
  
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