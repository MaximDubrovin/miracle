
/* Miracle plugin home — object under global variable */
M = {};

/* Plugin Settings home */
M.settings = {
    miracleClass: ".miracle",
    miraclesDefaultStyle: ".miracle { opacity: 0; }",
    spinnerFadeTimeout: 111,
    effectDuration: 500,
    easing: {
        'default': 'ease-in-out',
        'ease-y': 'ease-out',
        'ease-x': 'ease-out'
    },
    spinnerOpts: {
        lines: 9, // The number of lines to draw
        length: 6, // The length of each line
        width: 2, // The line thickness
        radius: 6, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1.6, // Rounds per second
        trail: 72, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    }
};

/* Plugin «global» variables home */
M.vars = {
    miracleStyleElem: undefined,
    dfd: {
        loaded: {},
        shown: {},
        triggered: {}
    }
};