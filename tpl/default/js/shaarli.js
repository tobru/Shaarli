/**
 * Retrieve an element up in the tree from its class name.
 */
function getParentByClass(el, className) {
    var p = el.parentNode;
    if (p == null || p.classList.contains(className)) {
        return p;
    }
    return getParentByClass(p, className);
}


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


/**
 * Expend search fields on focus.
 */
var searchInputs = document.querySelectorAll('#search input[type="text"]');
[].forEach.call(searchInputs, function(searchInput) {
    searchInput.addEventListener('focus', function(event) {
        event.target.style.width = '250px';
    });
    searchInput.addEventListener('blur', function(event) {
        event.target.style.width = '140px';
    });
});

/**
 * Fold/Expand shaares description.
 */
var foldButtons = document.querySelectorAll('.fold-button');
[].forEach.call(foldButtons, function(foldButton) {
    // Retrieve description
    var description = null;
    var linklistItem = getParentByClass(foldButton, 'linklist-item');
    if (linklistItem != null) {
        description = linklistItem.querySelector('.linklist-item-description');
        if (description != null) {
            foldButton.style.display = 'inline';
        }
    }

    foldButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Switch fold/expand - up = fold
        if (event.target.classList.contains('fa-chevron-up')) {

            event.target.title = 'Expand';
            description.style.display = 'none';
        }
        else {
            event.target.title = 'Fold';
            description.style.display = 'block';
        }
        event.target.classList.toggle('fa-chevron-down');
        event.target.classList.toggle('fa-chevron-up');
    });
});