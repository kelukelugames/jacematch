// Card data
const cardsArray = [{
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

// Grab the div with an id of root
const game = document.getElementById('game');

// Create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

// Append the grid section to the game div
game.appendChild(grid);

let gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random());

gameGrid.forEach(item => {
  // Create a div
  const card = document.createElement('div');

  // Apply a card class to that div
  card.classList.add('card');

  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = item.name;

  // Apply the background image of the div to the cardsArray image
  card.style.backgroundImage = `url(${item.img})`;

  // Append the div to the grid section
  grid.appendChild(card);
});

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
// delay of 1 second.
let delayMillis = 1000;

// Add event listener to grid
grid.addEventListener('click', function (event) {
  // The event target is our clicked item
  let clicked = event.target;

  // Do not allow the grid section itself to be selected; only select divs inside the grid
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected');
      // Set previous target to clicked  
      previousTarget = clicked;
    } else {
      // Assign second guess
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    }
    // If both guesses are not empty...
    if (firstGuess !== '' && secondGuess !== '') {
      // and the first guess matches the second match...

      if (firstGuess === secondGuess) {
        match();
        resetGuesses();
      } else {
        setTimeout(resetGuesses, delayMillis);
      }
    }
  }
 });


// Add match CSS
const match = () => {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};
