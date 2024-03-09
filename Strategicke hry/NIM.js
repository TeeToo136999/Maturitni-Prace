document.addEventListener('DOMContentLoaded', () => {
  const options = document.getElementById('options');
  const stonesInput = document.getElementById('stones');
  const startBtn = document.getElementById('startBtn');
  const gameContainer = document.getElementById('game-container');
  const pilesContainer = document.getElementById('piles');
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  var spinButton = document.getElementById('stones');
  var timer1 = setInterval(player, 500)
  var timer2 = setInterval(spinButtons, 500)
  var timer3 = setInterval(difselect, 500)
  var playersSelect = "0";
  function player() {
    if (document.getElementById('players1').checked) {
      playersSelect = "1"
    }
    else if (document.getElementById('players2').checked){
      playersSelect = "2"
    }
  }
  function difselect() {
    if (document.getElementById('easy').checked) {
      difficultySelect = "1"
    }
    else if (document.getElementById('hard').checked) {
      difficultySelect = "2"
  }
  }

function spinButtons() {
  if (spinButton.value < 10)
  {
      spinButton.value = 10;
  } else if (spinButton.value > 100)
  {
      spinButton.value = 100;
  }
}
  
  let currentPlayer = 'Hráč 1';
  let gameOver = false;

  const updateStatus = () => {
    status.textContent = `${currentPlayer} je na tahu`;
  };

  const checkWinner = () => {
    const stonesLeft = Array.from(pilesContainer.children).reduce((sum, pile) => sum + parseInt(pile.dataset.stones), 0);
    if (stonesLeft === 0) {
      gameOver = true;
      status.textContent = `${currentPlayer} vyhrál!`;
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === 'Hráč 1' ? 'Hráč 2' : 'Hráč 1';
  };

  const handleClick = (pile) => {
    if (!gameOver && pile.dataset.stones > 0) {
      let maxStonesToRemove;
      if (pile.dataset.stones === '1') {
        maxStonesToRemove = 1;  
      } else {
        maxStonesToRemove = Math.floor(parseInt(pile.dataset.stones) / 2);
      }
      const stonesToRemove = parseInt(prompt(`${currentPlayer}, Kolik kamenů chceš vzít? (1-${maxStonesToRemove})`));
      if (stonesToRemove >= 1 && stonesToRemove <= maxStonesToRemove) {
        pile.dataset.stones -= stonesToRemove;
        pile.innerHTML = pile.dataset.stones;
        checkWinner();
        if (!gameOver) {
          switchPlayer();
          updateStatus();
          if (playersSelect === '1') {
            setTimeout(computerMove, 500);
          }
        }
      } else {
        alert(`Špatné výběr čísla. Prosím vybe znovu. (1-${maxStonesToRemove}).`);
      }
      
    }
  };

  const computerMove = () => {
    const availablePiles = Array.from(pilesContainer.children).filter(pile => pile.dataset.stones > 0);
    if (availablePiles.length > 0) {
      const randomPile = Math.floor(Math.random() * availablePiles.length);
      const pile = availablePiles[randomPile];
      const maxStonesToRemove = Math.ceil(parseInt(pile.dataset.stones) / 2);
      const stonesToRemove = Math.floor(Math.random() * maxStonesToRemove) + 1;
      pile.dataset.stones -= stonesToRemove;
      pile.innerHTML = pile.dataset.stones;
      alert('Počítač odebral:   ' + stonesToRemove)
      checkWinner();
      if (!gameOver) {
        switchPlayer();
        updateStatus();
    }
        else {
        status.textContent = `Počítač vyhrál!`;
    }
    }
  };
  const createPiles = (numStones) => {
    let numPiles = 1;
    const hardOption = document.getElementById('hard');
    
    if (hardOption.checked) {
        numPiles = 3;
    }
    
    pilesContainer.innerHTML = '';
    for (let i = 1; i <= numPiles; i++) {
        const pile = document.createElement('div');
        pile.classList.add('pile');
        pile.dataset.stones = numStones;
        pile.innerHTML = numStones;
        pile.addEventListener('click', () => handleClick(pile));
        pilesContainer.appendChild(pile);
    }
};

  startBtn.addEventListener('click', () => {
    setTimeout(function() {
    clearInterval(timer1);
    }, 1000);
    setTimeout(function() {
    clearInterval(timer2);
    }, 1000);
    setTimeout(function() {
    clearInterval(timer3);
    }, 1000);
    const numStones = parseInt(stonesInput.value);
    const numPiles = playersSelect === '1' || playersSelect === '2' ? 3 : 2;
    createPiles(numStones);
    currentPlayer = 'Hráč 1';
    gameOver = false;
    updateStatus();
    options.style.display = 'none';
    gameContainer.style.display = 'block';
  });

  resetBtn.addEventListener('click', () => {
    options.style.display = 'block';
    gameContainer.style.display = 'none';
    timer1 = setInterval(player, 500)
    timer2 = setInterval(spinButtons, 500)
    timer3 = setInterval(difselect, 500)
  });
});

//popis
function toggleContent() {
  var content = document.getElementById("content");
  
  if (content.style.visibility === "hidden") {
    content.style.visibility = "visible";
  } else {
    content.style.visibility = "hidden";
  }
}