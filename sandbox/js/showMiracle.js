
M.showMiracle = {

    /* Prepare setups what should be done when miracle's
     deferred resolved */
    prepare: function(miracle) {
        M.spinner.show(miracle);

            if (miracle.awaitTrigger) {
                M.showMiracle.await.trigger(miracle);
            } else if (miracle.awaitShow) {
                /* should miracle await when other miracle will be shown? */
                M.showMiracle.await.show(miracle);
            } else if (miracle.awaitLoad) {
                /* should miracle await when other miracle will be loaded? */
                M.showMiracle.await.load(miracle);
            } else {
                var miracleDfdName = miracle.name;

                /* don't await any other miracle — show as fast as loaded */
                if (M.vars.dfd.loaded[miracleDfdName]) {
                    M.vars.dfd.loaded[miracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-loaded') {
                            M.showMiracle.show(miracle);
                        }
                    });
                }
            }
    },

    await: {

        load: function(miracle) {
            var $awaitedMiracle, awaitedId, miracleDfdName, awaitedMiracleDfdName;

            /* find awaited miracle */
            if (miracle.awaitLoad == 'prev') {
                $awaitedMiracle = miracle.$.prev('.miracle');
            } else {
                awaitedId = "[data-m-id='" + miracle.awaitLoad + "']";
                $awaitedMiracle = $(awaitedId);
            }

            if ($awaitedMiracle.hasClass('miracle')) {
                miracleDfdName = miracle.name;
                awaitedMiracleDfdName = $awaitedMiracle ? $awaitedMiracle.data('m-name'): {};

                //console.log($awaitedMiracle,miracleDfdName, awaitedMiracleDfdName);

                /* Miracle should be notified when it is loaded and
                 when awaited miracle is loaded. So there inverted check from
                 both deferred events */

                /* deferred from miracle that awaits */
                if (M.vars.dfd.loaded[miracleDfdName]) {
                    M.vars.dfd.loaded[miracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-loaded') {
                            /* 'm-loaded' comes from miracle so
                             we need also know when awaited miracle is loaded  */

                            //console.log('loaded', miracleDfdName)

                            if ($awaitedMiracle.data('m-loaded')) {
                                M.showMiracle.show(miracle);
                            }
                        }
                    });
                }

                /* deferred from awaited miracle */
                if (M.vars.dfd.loaded[awaitedMiracleDfdName]) {
                    M.vars.dfd.loaded[awaitedMiracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-loaded') {
                            /* 'm-shown' comes from awaited miracle so
                             we need also know when miracle is loaded  */

                            //console.log('loaded', awaitedMiracleDfdName)

                            if (miracle.$.data('m-loaded')) {
                                M.showMiracle.show(miracle);
                            }
                        }
                    });
                }
            } else {
                console.log('MIRACLE ERROR: There is no miracle to await for this miracle:', miracle);
                M.showMiracle.show(miracle);
            }
        },

        show: function(miracle) {
            var $awaitedMiracle, awaitedId, miracleDfdName, awaitedMiracleDfdName;

            /* find awaited miracle */
            if (miracle.awaitShow == 'prev') {
                $awaitedMiracle = miracle.$.prev('.miracle');
            } else {
                awaitedId = "[data-m-id='" + miracle.awaitShow + "']";
                $awaitedMiracle = $(awaitedId);
            }

            if ($awaitedMiracle.hasClass('miracle')) {
                miracleDfdName = miracle.name;
                awaitedMiracleDfdName = $awaitedMiracle ? $awaitedMiracle.data('m-name'): {};

                /* Miracle should be notified when it is loaded and
                 when awaited miracle is shown. So there inverted check from
                 both deferred events */

                /* deferred from miracle that awaits */
                if (M.vars.dfd.loaded[miracleDfdName]) {
                    M.vars.dfd.loaded[miracleDfdName].done(function(eType) {
                         if (eType && eType == 'm-loaded') {
                            /* 'm-loaded' comes from miracle so
                             we need also know when awaited miracle is shown  */

                             //console.log('loaded', miracleDfdName)

                             if ($awaitedMiracle.data('m-shown')) {
                                M.showMiracle.show(miracle);
                             }
                         }
                    });
                }

                /* deferred from awaited miracle */
                if (M.vars.dfd.shown[awaitedMiracleDfdName]) {
                    M.vars.dfd.shown[awaitedMiracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-shown') {
                            /* 'm-shown' comes from awaited miracle so
                             we need also know when miracle is loaded  */

                            //console.log('shown', awaitedMiracleDfdName)

                            if (miracle.$.data('m-loaded')) {
                                M.showMiracle.show(miracle);
                            }
                        }
                    });
                }
            } else {
                console.log('MIRACLE ERROR: There is no miracle to await for this miracle:', miracle);
                M.showMiracle.show(miracle);
            }
        },

        trigger: function(miracle) {
            var miracleDfdName = miracle.name;

            if (M.vars.dfd.triggered[miracleDfdName]) {
                M.vars.dfd.triggered[miracleDfdName].done(function(eType) {
                    if (eType && eType == 'm-triggered') {
                        /* triggered miracle shows immediately */
                        M.showMiracle.show(miracle);
                    }
                });
            }
        }
    },

    show: function(miracle) {
        /* Each miracle has unique attributes (data-m-rule-init & data-m-rule-final)
         based on miracle unique name.
         When all miracle ready to show — selector like [data-m-rule-init( and final)= "unique name"]
         adds to Miracle plugin <style/> element in <head/>.
         It causes miracle appearance. */

        var timeout, spinnerFadeTimeout;

        /* Check for miracle show timeout */
        miracle.timeout ? timeout = miracle.timeout : timeout = 0;

        /* Check for miracle spinner fade timeout
         (timeout for spinner smooth consistent «fade out» animation) */
        miracle.spinner ? spinnerFadeTimeout = M.settings.spinnerFadeTimeout : spinnerFadeTimeout = 0;

        setTimeout(function() {
            M.spinner.hide(miracle);

            setTimeout(function() {
                M.vars.miracleStyleElem[0].innerHTML +=M.buildRule.state.final(miracle);
                M.markAsShown(miracle);
            }, spinnerFadeTimeout);
        }, timeout);
    }
}
