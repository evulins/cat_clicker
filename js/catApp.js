
    let gameStarted = false;
    var model = {
        cats: [ 
            {name: 'Stefka', image: 'stefka.jpg'},
            {name: 'Lola', image: 'lola.jpg'},
            {name: 'Mokra Stefka', image: 'mokraStefka.jpg'},
            {name: 'Mokra Lola', image: 'mokraLola.jpg'},
            {name: 'Dziewczyny', image: 'cats.jpg'}
        ]
    };


    var octopus = {
        // Gets all cats from the list
        getAll: function() {
                return model.cats;
        },
        // Gets selected cat based on her name
        getSelectedCat: function(name) {
            var result = model.cats.filter(function(element) {
                return element.name === name;
            });
            return result[0];
        },

        registerClickCat: function() {
            $('.selectCat').click(function(event) {
                event.preventDefault();
                $(".catsSelection").hide();
                $(".cats").show();
                $(".score-panel").show();
                clearCatWindow();
                clearCatsList();
                const kitty = $(this).find('.nameSelector').text();
                const selectedCat = model.cats.getSelectedCat(kitty);
                catView.showCat(selectedCat);
            });

        },

        clearCatWindow: function() {
            $(".cat").empty();
        },

        clearCatsList: function() {
            $(".catsList").empty();
        },

        startGame: function() {
            //Runs the stopwatch
            $('.runner').runner();
        },

        init: function() {
            catlistView.catSelector(getAll());
            registerClickCat();
            $('.runner').runner();
        }
    };

    var catListView = {
        catSelector: function(catsList) {
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

    };

    var catView = {
        showCat: function(selectedCat) {
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
    };
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

octopus.init();
