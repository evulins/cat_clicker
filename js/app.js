
const model = {
    gameStarted: false,
    cats: [ 
        {name: 'Stefka', image: 'images/stefka.jpg', clickCounter: 0},
        {name: 'Lola', image: 'images/lola.jpg', clickCounter: 0},
        {name: 'Mokra Stefka', image: 'images/mokraStefka.jpg', clickCounter: 0},
        {name: 'Mokra Lola', image: 'images/mokraLola.jpg', clickCounter: 0},
        {name: 'Dziewczyny', image: 'images/cats.jpg', clickCounter: 0}
    ]
};

// Global variables
const octopus = {

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
    updateCat: function(oldName, newName, newUrl, newClickNumber) {
        var cat = this.getSelectedCat(oldName);
        
        cat.name = newName;
        cat.image = newUrl;
        cat.clickCounter = newClickNumber;
    },
    //Shows selected cat from the cat list
    registerClickCat: function() {
        $('.selectCat').click(function(event) {
            event.preventDefault();
            catsListView.hide();
            catView.show();
            $(".score-panel").show();
            $(".admin-button").show();
            catView.clearCatWindow();
            catsListView.clear();
            const kitty = $(this).find('.nameSelector').text();
            const selectedCat = octopus.getSelectedCat(kitty);
            catView.render(selectedCat);
            catView.adminForm(selectedCat);
            //Button save
            $('.save').on('click', function(event) {
                event.preventDefault();
                var newName = $('#name').val();
                var newUrl = $('#url').val();
                var newClickNumber = $('#clicks').val();
                octopus.updateCat(kitty, newName, newUrl, newClickNumber);
                $('.name span').text(newName);
                $('.image img').attr( "src", newUrl);
                $('.clicks').text(newClickNumber);
                $('.admin-form').hide();

            });

            $('.cancel').on('click', function(event) {
                event.preventDefault();
                $('.admin-form').hide();
            });
        });
    },
    
    startGame: function() {
    //Runs the stopwatch
    $('.runner').runner();
    }
};

//Creates list of cats
const catsListView = {
    init: function() {
        this.catsMenu = $('.catsMenu');
        this.catsListContainer = $('.cats-list-container');
    },
    render: function(catsList) {
        this.catsMenu.empty();
        for (let i = 0; i < catsList.length; i++) {
            const current = catsList[i];
            const catName = $(`
                <li class="selectCat">
                        <p class="nameSelector"><span>${current.name}</span></p>
                </li>
            `);

            catName.find('.nameSelector').on('click', function(event) {
                event.preventDefault();
                catsListView.hide();
                catView.show();
            });
            // Adds all cats to list .catsList
            this.catsMenu.append(catName);
        };
    },
    show: function() {
        this.catsListContainer.show();
    },

    hide: function() {
        this.catsListContainer.hide();
    },

    clear: function() {
        $(".catsList").empty();
    }
}

//Shows selected cat
const catView = {
    init: function() {
        this.catContainer = $('.cat-container');
    },

    render: function(selectedCat) {
        const cat = $(`
            <div class='cat'>
                <div class="catInfo">
                    <p class='name'><span>${selectedCat.name}</span></p>
                    <p><span class="clicks">${selectedCat.clickCounter}</span> clicks</p>
                </div>
                <div class='image'>
                    <img src="${selectedCat.image}">
                </div>
            </div>
        `);
        const counter = cat.find('span.clicks');

        cat.find('.image').on('click', (function(counter) {
                return function() {
                    const clicks = counter.text();
                    counter.text(parseInt(clicks) + 1);
                    if (model.gameStarted === false) {
                        model.gameStarted = true;
                        $('.runner').runner('start');
                    }
                    $('#clicks').val(counter.text());
            };
        })(counter));

        // Adds all cats to list .catsList
        this.catContainer.append(cat);
    },

    show: function() {
        this.catContainer.show();
    },

    hide: function() {
        this.catContainer.hide();
    },

    adminForm: function(catData) {
        const currentCat = catData;
        $('.admin-button').on('click', function(event) {
            event.preventDefault();
            $(".admin-form").show();
            $('#name').val(currentCat.name);
            $('#url').val(currentCat.image);
            $('#clicks').val(currentCat.clickCounter);
        });
    },

    clearCatWindow: function() {
        $(".cat").empty();
    },

    clearAdminForm: function() {
        $("#name").empty();
        $("#url").empty();
        $("#clicks").empty();
    }
};


// Resets the game and the score
$('.redo, .button').on('click', function(event) {
    event.preventDefault();
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
    catView.clearAdminForm();
});

$('.left, .button').on('click', function(event) {
    event.preventDefault();
    catsListView.render(octopus.getAll());
    catsListView.show();
    octopus.registerClickCat();
    catView.hide();
    $(".score-panel").hide();
    $(".admin-form").hide();
    $('.admin-button').hide();
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
    model.gameStarted = false;
    catView.clearAdminForm();
});


(function() {
    catsListView.init();
    catView.init();
    octopus.startGame();
    catsListView.render(octopus.getAll());
    octopus.registerClickCat();
})();

