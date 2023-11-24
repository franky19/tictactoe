const boardElement = document.getElementById('board');
let currentPlayer = 'X';
let gameActive = true;
let board; // Declare board in the outer scope
var inputElement = document.getElementById("insertRepeatCell");
var myinputType = document.getElementById("container-insert");

function getSelectedRadioButtonValue() {
  const selectedRadioButton = document.querySelector('input[name="chooseGame"]:checked');

  if (selectedRadioButton) {
    if(selectedRadioButton.value === "defaultGame") {
      boardElement.style.display = "grid";
      myinputType.style.display='none';
      createBoard(3);
    } else {
      boardElement.style.display = "none";
      inputElement.value = '';
      myinputType.style.display="block";
    }
  } else {
    alert("Please select a game");
  }
}

function createBoard(size) {
  board = Array.from({ length: size }, () => Array(size).fill(null));
  boardElement.innerHTML = '';
  document.documentElement.style.setProperty('--size', size);

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }

  function handleCellClick(event) {
    if (!gameActive) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col] === null) {
      board[row][col] = currentPlayer;
      event.target.textContent = currentPlayer;

      if (checkWinner()) {
        const selectedRadioButton = document.querySelector('input[name="chooseGame"]:checked');
        if (window.confirm(`${currentPlayer} wins!, please click OK to reset the game`)) {
          resetGame();
        }
      } else if (board.flat().every(cell => cell !== null)) {
        alert('It\'s a draw!');
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function resetGame() {
    boardElement.innerHTML = '';
    currentPlayer = 'X';
    gameActive = true;
    inputElement.value = '';
    createBoard();
  }

  function checkWinner() {
    for (let i = 0; i < size; i++) {
      if (checkLine(board[i]) || checkLine(board.map(row => row[i]))) {
        return true;
      }
    }

    if (checkLine(board.map((_, index) => board[index][index]))) {
      return true;
    }

    if (checkLine(board.map((_, index) => board[index][size - index - 1]))) {
      return true;
    }

    return false;
  }

  function checkLine(line) {
    return line.every(cell => cell === currentPlayer);
  }
}

function updateValue() {
  let inputError = document.getElementById('insertRepeatCell-error');
  let myBoardSize = parseInt(inputElement.value);

  if (myBoardSize < 3 || isNaN(myBoardSize)) {
    inputError.textContent = "Please insert a valid value greater than or equal to 3";
    boardElement.style.display = "none";
    createBoard(myBoardSize);
  } else {
    inputError.textContent = "";
    boardElement.innerHTML = '';
    boardElement.style.display = "grid";
    createBoard(myBoardSize);
  }

  console.log("Updated number of cells:", myBoardSize);
}

function resetGame() {
  boardElement.innerHTML = '';
  currentPlayer = 'X';
  gameActive = true;
  inputElement.value = '';
  createBoard();
}

function resetGameDefault() {
  boardElement.innerHTML = '';
  currentPlayer = 'X';
  gameActive = true;
  inputElement.value = '';
  createBoard(3);
}

function ButtonResetGame(){
  const selectedRadioButton = document.querySelector('input[name="chooseGame"]:checked');

  if (selectedRadioButton) {
    if(selectedRadioButton.value === "defaultGame") {
      resetGameDefault(3)
    } else {
     resetGame()
    }
  } else {
    alert("Please select a game");
  }
}
