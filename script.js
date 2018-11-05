var firstGuess = '';
var secondGuess = '';
var selectedCount = 0;
var matchCount = 0;
var clickCount = 0;
var previousTarget = null;

var resetDelayMillis = 1000;
var matchDelayMillis = 200;

var clickSound = new Audio("sound/click.wav");
var matchSound = new Audio("sound/match.wav");
var noMatchSound = new Audio("sound/no_match.wav");
var victorySound = new Audio("sound/victory.wav");

var startTimeMillis = 0;
var timePassedMillis = 0;

// Card data
const cardsArray = [
  {
    'name': 'jace_beleren',
    'img': 'img/jace_beleren.jpeg',
  },
  {
    'name': 'jace_architect_of_thought',
    'img': 'img/jace_architect_of_thought.jpeg',
  },
  {
    'name': 'jace_cunning_castaway',
    'img': 'img/jace_cunning_castaway.jpeg',
  },
  {
    'name': 'jace_ingenious_mind_mage',
    'img': 'img/jace_ingenious_mind_mage.jpeg',
  },
  {
    'name': 'jace_memory_adept',
    'img': 'img/jace_memory_adept.jpeg',
  },
  {
    'name': 'jace_telepath_unbound',
    'img': 'img/jace_telepath_unbound.jpeg',
  },
  {
    'name': 'jace_the_living_guildpact',
    'img': 'img/jace_the_living_guildpact.jpeg',
  },
  {
    'name': 'jace_the_mind_sculptor',
    'img': 'img/jace_the_mind_sculptor.jpeg',
  },
  {
    'name': 'jace_unraveler_of_secrets',
    'img': 'img/jace_unraveler_of_secrets.jpeg',
  },
];

const memoryGame = document.getElementById('memorygame');

const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

memoryGame.appendChild(grid);

let gameGrid = cardsArray.concat(cardsArray);

// Randomize gameGrid on each load.
gameGrid.sort(() => 0.5 - Math.random());

gameGrid.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;

  card.appendChild(front);
  card.appendChild(back);
  grid.appendChild(card);
});

grid.addEventListener('click', function (event) {
  let clicked = event.target;

  // Do not allow the grid section itself to be selected; only select divs inside the grid.
  if (clicked.nodeName === 'SECTION' ||
     clicked === previousTarget ||
     clicked.classList.contains('match')||
     clicked.parentNode.classList.contains('selected')) {
    return;
  }
  // Two cards are already selected.
  if (selectedCount >= 2) {
    return;
  }

  if (clickCount == 0) {
    startTimeMillis = new Date().getTime();
  }

  selectedCount++;
  clickCount++;
  clickSound.play();
  if (selectedCount === 1) {
    firstGuess = clicked.parentNode.dataset.name;
    console.log(firstGuess);
    clicked.parentNode.classList.add('selected');
    // Set previous target to clicked.
    previousTarget = clicked;
    return;
  }

  secondGuess = clicked.parentNode.dataset.name;
  console.log(secondGuess);
  clicked.parentNode.classList.add('selected');

  if (firstGuess === secondGuess) {
    setTimeout(match, matchDelayMillis);
    setTimeout(resetGuesses, resetDelayMillis);
    return;
  }
  setTimeout(resetGuesses, resetDelayMillis);
});


const match = () => {
  matchSound.play();
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
  matchCount++;

  if (matchCount == cardsArray.length) {
    victory();
  }
}

function victory() {
  timePassedMillis = new Date().getTime();
  timePassedMillis -= startTimeMillis;
  victorySound.play();
  showVictoryModal();
}

function showVictoryModal() {
  var modal = document.getElementById('victorymodal');
  var text = document.getElementById('modaltext');
  text.innerHTML += clickCount + " moves in ";
  text.innerHTML += timePassedMillis/1000 + " seconds.";


  var img = document.getElementById('modalimg');
  img.innerHTML += "<img src='" + getVictoryImgSrc(timePassedMillis/1000) + "'>";

  modal.style.display = "block";
}

function getVictoryImgSrc(seconds) {
  if (seconds < 30) {
    return "img/hornet_queen.jpeg"
  }
  if (seconds < 35) {
    return "img/enthralling_victor.jpeg"
  }
  if (seconds < 40) {
    return "img/speedway_fanatic.jpeg"
  }
  if (seconds < 50) {
    return "img/hill_giant.jpeg"
  }
  if (seconds < 60) {
    return "img/boros_recruit.jpeg"
  }
  if (seconds < 90) {
    return "img/inexorable_blob.jpeg"
  }
  return "img/thing_in_the_ice.jpeg"
}

const resetGuesses = () => {
  if (firstGuess !== secondGuess) {
    noMatchSound.play();
  }
  firstGuess = '';
  secondGuess = '';
  selectedCount = 0;
  previousTarget = null

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};
