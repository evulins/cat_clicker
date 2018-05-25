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