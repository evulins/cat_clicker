// Global variables

let clickCounter = 0;
let gameStarted = false;


// Increments and updates the move counter
function updateClickCounter() {
    clickCounter += 1;
    $('span.clicks').text(clickCounter);
}

// Resets the game and the score
$('.restart, .button').on('click', function() {
    event.preventDefault();
    gameOver = false;
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
});

function startGame() {
    //Runs the stopwatch
    $('.runner').runner();

//Adds the event listener for a clicked card
    $('.cats').on('click', function(event) {
        event.preventDefault();
        updateClickCounter();

        if (gameStarted === false) {
            gameStarted = true;
            $('.runner').runner('start');
        }
    });
}

(function() {
    startGame();
})();