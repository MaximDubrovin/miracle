
/* Plugin uses $.Deferred() for events.
Each miracle has several deferreds:
dfd for «m-loaded» event — M.vars.dfd.loaded[miracle.name]
dfd for «m-shown» event — M.vars.dfd.loaded[miracle.name] */
M.bindEvents = function(miracle) {
    /* binds should go before any triggers */

    miracle.$.on('m-loaded', function() {

        miracle.$.data('m-loaded', true);

        if (M.vars.dfd.loaded[miracle.name]) {
            M.vars.dfd.loaded[miracle.name].resolve('m-loaded');
        }
    });

    miracle.$.on('m-shown', function() {

        miracle.$.data('m-shown', true);

        if (M.vars.dfd.shown[miracle.name]) {
            M.vars.dfd.shown[miracle.name].resolve('m-shown');
        }
    });

    miracle.$.on('m-show', function() {

        miracle.$.data('m-show', true);

        if (M.vars.dfd.triggered[miracle.name]) {
            M.vars.dfd.triggered[miracle.name].resolve('m-triggered');
        }
    });
}

