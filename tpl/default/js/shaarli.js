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

/**
 * Confirmation message before deletion.
 */
var deleteLinks = document.querySelectorAll('.delete-link');
[].forEach.call(deleteLinks, function(deleteLink) {
    deleteLink.addEventListener('click', function(event) {
        if(!confirm('Are you sure you want to delete this link ?')) {
            event.preventDefault();
        }
    });
});

/**
 * Close alerts
 */
var closeLinks = document.querySelectorAll('.pure-alert-close');
[].forEach.call(closeLinks, function(closeLink) {
    closeLink.addEventListener('click', function(event) {
        var alert = getParentByClass(event.target, 'pure-alert-closable');
        alert.style.display = 'none';
    });
});

/**
 * New version dismiss.
 * Hide the message for one week using localStorage.
 */
var newVersionDismiss = document.getElementById('new-version-dismiss');
var newVersionMessage = document.querySelector('.new-version-message');
if (newVersionMessage != null
    && localStorage.getItem('newVersionDismiss') != null
    && parseInt(localStorage.getItem('newVersionDismiss')) + 7*24*60*60*1000 > (new Date()).getTime()
) {
    newVersionMessage.style.display = 'none';
}
if (newVersionDismiss != null) {
    newVersionDismiss.addEventListener('click', function () {
        localStorage.setItem('newVersionDismiss', (new Date()).getTime());
    });
}

/**
 * Login button
 */
var loginButton = document.getElementById('login-button');
var loginBlock = document.getElementById('header-login-form');

if (loginButton != null) {
    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        loginBlock.classList.toggle('open');
        document.getElementById('content').style.boxShadow = 'none';
    });
}

// Focus on login field.
if (loginBlock != null) {
    loginBlock.addEventListener('transitionend', function () {
        loginBlock.firstElementChild.focus();
    });
}

var hiddenReturnurl = document.getElementsByName('returnurl');
if (hiddenReturnurl != null) {
    hiddenReturnurl.value = window.location.href;
}

/**
 * Autofocus text fields
 */
var autofocusElements = document.querySelector('.autofocus');
if (autofocusElements != null) {
    autofocusElements.focus();
}