/**
 * Handle responsive menu.
 * Source: http://purecss.io/layouts/tucked-menu-vertical/
 */
(function (window, document) {
    var menu = document.getElementById('shaarli-menu'),
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

    function toggleHorizontal() {
        [].forEach.call(
            document.getElementById('shaarli-menu').querySelectorAll('.menu-transform'),
            function(el){
                el.classList.toggle('pure-menu-horizontal');
            }
        );
    };

    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            setTimeout(toggleHorizontal, 500);
        }
        else {
            toggleHorizontal();
        }
        menu.classList.toggle('open');
        document.getElementById('menu-toggle').classList.toggle('x');
    };

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    document.getElementById('menu-toggle').addEventListener('click', function (e) {
        toggleMenu();
    });

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);

var searchInputs = document.querySelectorAll('#search input[type="text"]');
[].forEach.call(searchInputs, function(searchInput) {
    searchInput.addEventListener('focus', function(event) {
        event.target.style.width = '250px';
    });
    searchInput.addEventListener('blur', function(event) {
        event.target.style.width = '140px';
    });
});