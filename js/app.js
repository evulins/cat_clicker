// Global variables

let gameStarted = false;

let cats = {
    list: [ 
        {name: 'Stefka', image: 'stefka.jpg'},
        {name: 'Lola', image: 'lola.jpg'},
        {name: 'Mokra Stefka', image: 'mokraStefka.jpg'},
        {name: 'Mokra Lola', image: 'mokraLola.jpg'},
        {name: 'Dziewczyny', image: 'cats.jpg'}
    ],

    getAll: function() {
            return cats.list;
    }
};

function showCats(catsList) {

    for (let i = 0; i < catsList.length; i++) {
        const current = catsList[i];
        const cat = $(`
            <li class="cat">
                <div class="catInfo">
                    <p class="name"><span>${current.name}</span></p>
                    <span class="clicks">0</span> clicks
                </div>
                <div class="image">
                    <img src="images/${current.image}">
                </div>
            </li>
        `);
        const counter = cat.find('span.clicks');

        cat.find('.image').on('click', (function(counter) {
            return function() {
                const clicks = counter.text();
                counter.text(parseInt(clicks) + 1);
                if (gameStarted === false) {
                    gameStarted = true;
                    $('.runner').runner('start');
                }
            };
        })(counter));

        // Adds all cats to list .catsList
        $('.catsList').append(cat);
    }  
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

//Adds the event listener for a clicked cat
    // $('img').on('click', function(event) {
    //     event.preventDefault();
    //     updateClickCounter();

    //     if (gameStarted === false) {
    //         gameStarted = true;
    //         $('.runner').runner('start');
    //     }
    // });
}

(function() {
    showCats(cats.getAll());
    startGame();
})();

