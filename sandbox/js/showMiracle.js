
M.showMiracle = {

    prepare: function(miracle) {
        M.spinner.show(miracle);

        if (miracle.awaitShow) {
            /* should miracle await when other miracle will be shown? */
            M.showMiracle.await.show(miracle);
        } else if (miracle.awaitLoad) {
            /* should miracle await when other miracle will be loaded? */
            M.showMiracle.await.load(miracle);
        } else {
            /* don't await any other miracle — show as fast as loaded */
            M.showMiracle.show(miracle);
        }
    },

    await: {

        load: function(miracle) {
            var $awaitMiracle, awaitId;

            if (miracle.awaitLoad == 'prev') {
                $awaitMiracle = miracle.$.prev('.miracle');
            } else {
                awaitId = "[data-m-id='" + miracle.awaitLoad + "']";
                $awaitMiracle = $(awaitId);
            }

            if ($awaitMiracle.hasClass('miracle')) {
                /* await miracle must have class «miracle» to cooperate with other miracles */

                var checkAwaitMiracleLoaded = setInterval(function() {
                    if (miracle.$.data('m-loaded')) {
                        /* firstly check miracle loaded status */

                        if ($awaitMiracle.data('m-loaded')) {
                            /* secondly check await miracle loaded status */

                            M.showMiracle.show(miracle);

                            clearInterval(checkAwaitMiracleLoaded);
                        }
                    }
                }, 5)
            } else {
                console.log('MIRACLE ERROR: There is no miracle to await for this miracle:', miracle);
                M.showMiracle.show(miracle);
            }
        },

        show: function(miracle) {
            var $awaitMiracle, awaitId;

            if (miracle.awaitShow == 'prev') {
                $awaitMiracle = miracle.$.prev('.miracle');
            } else {
                awaitId = "[data-m-id='" + miracle.awaitShow + "']";
                $awaitMiracle = $(awaitId);
            }

            if ($awaitMiracle.hasClass('miracle')) {
                /* await miracle must have class .miracle to cooperate with other miracles */

                var checkAwaitMiracleLoaded = setInterval(function() {
                    if (miracle.$.data('m-loaded')) {
                        /* firstly check miracle loaded status */

                        if ($awaitMiracle.data('m-shown')) {
                            /* secondly check await miracle shown status */

                            M.showMiracle.show(miracle);

                            clearInterval(checkAwaitMiracleLoaded);
                        }
                    }
                }, 5)
            } else {
                console.log('MIRACLE ERROR: There is no miracle to await for this miracle:', miracle);
                M.showMiracle.show(miracle);
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

            /* Timeout 0 or greater before creating initial of miracle state is necessary
             to apply initial state effect state  */
            M.vars.miracleStyleElem[0].innerHTML += M.buildRule.state.init(miracle);

            setTimeout(function() {
                M.vars.miracleStyleElem[0].innerHTML +=M.buildRule.state.final(miracle);
                M.markAsShown(miracle);
            }, spinnerFadeTimeout);
        }, timeout);
    }
}
