
M.spinner = {

    show: function(miracle) {
        if (typeof Spinner != 'undefined' && miracle.spinner.use) {

            /* (trick) Because we can't make opaque spinner inside transparent miracle
             we need to make miracle opaque until miracle show starts */
            miracle.$.css('opacity', '1');
            miracle.$.css('visibility', 'hidden');

            /* create spinner */
            miracle.spinner.this = new Spinner(M.settings.spinnerOpts).spin();

            /* get spinner element */
            miracle.spinner.$ = $(miracle.spinner.this.el);

            /* styles to center spinner inside miracle */
            miracle.spinner.$.css({
                top: '50%',
                left: '50%',
                visibility: 'visible'
            });

            /* add spinner inside miracle */
            miracle.$[0].appendChild(miracle.spinner.this.el)
        }
    },

    hide: function(miracle) {
        if (typeof Spinner != 'undefined' && miracle.spinner.use) {
            var spinnerFadeTimeout = M.settings.spinnerFadeTimeout;

            /* (trick) Remove styles which made spinner visible. See M.showSpinner */
            miracle.$.css('opacity', '');
            miracle.$.css('visibility', '');

            /* make spinner fade out smooth */
            var transition = 'opacity ' + M.settings.spinnerFadeTimeout + 'ms ' + ' ease-in-out';
            miracle.spinner.$.css({
                transition: transition,
                opacity : 0
            });

            setTimeout(function() {
                /* timeout for smooth spinner fade out before spinner stopping */
                miracle.spinner.this.stop();
            }, spinnerFadeTimeout);
        }
    }
}
