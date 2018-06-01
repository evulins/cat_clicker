// Global variables

let gameStarted = false;

let cats = {
    list: [ 
        {name: 'Stefka', image: 'images/stefka.jpg', clickCounter: 0},
        {name: 'Lola', image: 'images/lola.jpg', clickCounter: 0},
        {name: 'Mokra Stefka', image: 'images/mokraStefka.jpg', clickCounter: 0},
        {name: 'Mokra Lola', image: 'images/mokraLola.jpg', clickCounter: 0},
        {name: 'Dziewczyny', image: 'images/cats.jpg', clickCounter: 0}
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
    },
    updateCat: function(oldName, newName, newUrl, newClickNumber) {
        var cat = cats.getSelectedCat(oldName);
        
        cat.name = newName;
        cat.image = newUrl;
        cat.clickCounter = newClickNumber;
    }
};

//Creates list of cats
function catSelector(catsList) {
    $('.catsMenu').empty();
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
        $(".admin-button").show();
        clearCatWindow();
        clearCatsList();
        const kitty = $(this).find('.nameSelector').text();
        const selectedCat = cats.getSelectedCat(kitty);
        catView.showCat(selectedCat);
        adminForm(selectedCat);
        //Button save
        $('.save').on('click', function(event) {
            event.preventDefault();
            var newName = $('#name').val();
            var newUrl = $('#url').val();
            var newClickNumber = $('#clicks').val();
            cats.updateCat(kitty, newName, newUrl, newClickNumber);
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
}

//Shows selected cat
var catView = {
    showCat: function(selectedCat) {
        const current = selectedCat;
        const cat = $(`
            <li class='cat'>
                <div class="catInfo">
                    <p class='name'><span>${current.name}</span></p>
                    <p><span class="clicks">${current.clickCounter}</span> clicks</p>
                </div>
                <div class='image'>
                    <img src="${current.image}">
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
                    $('#clicks').val(counter.text());
            };
        })(counter));

        // Adds all cats to list .catsList
        $('.catsList').append(cat);
    }
};

function adminForm(catData) {
    const currentCat = catData;
    $('.admin-button').on('click', function(event) {
        event.preventDefault();
        $(".admin-form").show();
        $('#name').val(currentCat.name);
        $('#url').val(currentCat.image);
        $('#clicks').val(currentCat.clickCounter);
    });
}

function clearCatWindow() {
  $(".cat").empty();
}

function clearCatsList() {
  $(".catsList").empty();
}

function clearAdminForm() {
    $("#name").empty();
    $("#url").empty();
    $("#clicks").empty();
}

// Resets the game and the score
$('.redo, .button').on('click', function(event) {
    event.preventDefault();
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
    clearAdminForm();
});

$('.left, .button').on('click', function(event) {
    event.preventDefault();
    catSelector(cats.getAll());
    $(".catsSelection").show();
    registerClickCat();
    $(".cats").hide();
    $(".score-panel").hide();
    $(".admin-form").hide();
    $('.admin-button').hide();
    $('span.clicks').text('0');
    $('.runner').runner('reset', true);
    clickCounter = 0;
    gameStarted = false;
    clearAdminForm();
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

