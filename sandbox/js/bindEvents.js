
/* Custom events for different purposes */
M.bindEvents = function(miracle) {

    miracle.$.on('m-shown', function() {
        //var miracle = $(this)
        //miracle.$.data('m-shown', true);
    });

    miracle.$.on('m-ready', function() {
        miracle.$.data('m-ready', true);
        M.showMiracle.show(miracle);
    });
}

