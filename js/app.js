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
        const catName = $(`
            <li class="selectCat">
                    <p class="nameSelector"><span>${current.name}</span></p>
            </li>
        `);

        catName.find('.nameSelector').on('click', function(event) {
            event.preventDefault();
            $(".catsSelection").hide();
            $(".cats").show();
        });
        // Adds all cats to list .catsList
        $('.catsMenu').append(catName);
    };
}

//Shows selected cat from the cat list
function registerClickCat() {
    $('.selectCat').click(function(event) {
        event.preventDefault();
        $(".catsSelection").hide();
        $(".cats").show();
        $(".score-panel").show();
        clearCatWindow();
        clearCatsList();
        const kitty = $(this).find('.nameSelector').text();
        const selectedCat = cats.getSelectedCat(kitty);
        showCat(selectedCat);
    });
}

//Shows selected cat
function showCat(selectedCat) {
    const current = selectedCat;
    const cat = $(`
        <li class='cat'>
            <div class="catInfo">
                <p class='name'><span>${current.name}</span></p>
                <p><span class="clicks">0</span> clicks</p>
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

function clearCatWindow() {
  $(".cat").empty();
}

function clearCatsList() {
  $(".catsList").empty();
}

// Resets the game and the score
$('.redo, .button').on('click', function(event) {
    event.preventDefault();
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
});

$('.left, .button').on('click', function(event) {
    event.preventDefault();
    $(".catsSelection").show();
    $(".cats").hide();
    $(".score-panel").hide();
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
    gameStarted = false;
});

function startGame() {
    //Runs the stopwatch
    $('.runner').runner();

}

(function() {
    startGame();
    catSelector(cats.getAll());
    registerClickCat();
})();

