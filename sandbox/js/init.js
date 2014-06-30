
/* Initialize (starts) plugin. Executes when the DOM is fully loaded. */
M.init = function() {


    /* Find all miracles */
    var miracles = $(M.settings.miracleClass);

    if (miracles.length) {
        /* Without miracles — there is nothing to do */

        M.createStyleElem();

        miracles.each(function() {
            /* miracle — object which collects jQuery object & all miracle properties */
            var miracle = {},
                $this = $(this),
                allImgs;


            /* Props defined by plugin for further usage */
            miracle.$ = $(this);
            miracle.name = M.getUniqueName();
            miracle.$.data('m-name', miracle.name);
            M.vars.dfd.loaded[miracle.name] = $.Deferred();
            M.vars.dfd.shown[miracle.name] = $.Deferred();
            M.vars.dfd.triggered[miracle.name] = $.Deferred();
            miracle.imgsLoadedCounter = 0;
            miracle.spinner = {};
            miracle.loadError = false;

            /* Get props declared by developer */
            miracle.inherit = miracle.$.data('m-inherit');
            miracle.props = M.getProps.init(miracle);
            miracle.effect = miracle.props.mEffect;
            miracle.style = {
                init: miracle.props.mStyleInit,
                final: miracle.props.mStyleFinal
            };
            miracle.easing = miracle.props.mEasing;
            miracle.opaque = miracle.props.mOpaque;
            miracle.scaleInit = miracle.props.mScaleInit;
            miracle.origin = miracle.props.mOrigin;
            miracle.translate = miracle.props.mTranslate;
            miracle.duration = miracle.props.mDuration;
            miracle.awaitTrigger = miracle.props.mAwaitTrigger;
            miracle.awaitLoad = miracle.props.mAwaitLoad;
            miracle.awaitShow = miracle.props.mAwaitShow;
            miracle.timeout = miracle.props.mTimeout;
            miracle.errorStyle = miracle.props.mErrorStyle;
            miracle.spinner.use = miracle.props.mSpinner;
            miracle.spinner.style = miracle.props.mSpinnerStyle;

            M.defineSelectors(miracle);

            /* Binds should go before any triggers. Binds setups when
            miracle's deferreds should be resolved */
            M.bindEvents(miracle);

            /* Style initial initial state of miracle */
            M.vars.miracleStyleElem[0].innerHTML += M.buildRule.state.init(miracle);


            /* Prepare setups what should be done when miracle's
            deferred resolved */
            M.showMiracle.prepare(miracle);

            allImgs = M.findImgs.init(miracle);

            miracle.imgsLength = allImgs.length;

            if (allImgs.length) {
                M.bindImgs(miracle, allImgs);
            } else {
                miracle.$.trigger('m-loaded');
            }

            /* Mark already parsed miracles to no repeat this when
            miracles are dynamically added and M.init() triggered manually.  */
            miracle.$.attr('data-m-parsed', true);
        });
    }
}