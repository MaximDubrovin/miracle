
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
            miracle.imgsLoadedCounter = 0;
            miracle.spinner = {};

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
            miracle.trigger = miracle.props.mTrigger;
            miracle.awaitLoad = miracle.props.mAwaitLoad;
            miracle.awaitShow = miracle.props.mAwaitShow;
            miracle.timeout = miracle.props.mTimeout;
            miracle.spinner.use = miracle.props.mSpinner;

            M.bindEvents(miracle);

            M.defineSelectors(miracle);

            allImgs = M.findImgs.init(miracle);

            if (allImgs.length) {
                M.bindImgs(miracle, allImgs);
            } else {
                miracle.$.data('m-loaded', true);
                M.showMiracle.prepare(miracle);
            }
        });
    }
}