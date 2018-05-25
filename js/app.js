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
    // Gets all cats from the list
    getAll: function() {
            return cats.list;
    },
    // Gets selected cat based on her name
    getSelectedCat: function(name) {
        var result = cats.list.filter(function(element) {
            return element.name === name;
        });
        return result[0];
    }
};

//Creates list of cats
function catSelector(catsList) {
    for (let i = 0; i < catsList.length; i++) {
        const current = catsList[i];
        const cat = $(`
            <li class="selectCat">
                    <p class="nameSelector"><span>${current.name}</span></p>
            </li>
        `);

        cat.find('.nameSelector').on('click', function(event) {
            event.preventDefault();
            $(".catsSelection").hide();
            $(".cats").show();
        });
        // Adds all cats to list .catsList
        $('.catsMenu').append(cat);
    };
}

// function registerClickCat() {
//   $('.selectCat').click(function(event) {
//     event.preventDefault();
//     $(".catsSelection").hide();
//     $(".cats").show()
//     const cat = $(this).find('.name span').text();
//     var selectedCat = cats.getCat(cat);
//     showCat(selectedCat);
// });

//Shows selected cat
function showCat(catsList) {

    for (let i = 0; i < catsList.length; i++) {
        const current = catsList[i];
        const cat = $(`
            <li class='cat'>
                <div class="catInfo">
                    <p class='name'><span>${current.name}</span></p>
                    <span class="clicks">0</span> clicks
                </div>
                <div class='image'>
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
    startGame();
    showCat(cats.getAll());
    catSelector(cats.getAll());
})();

