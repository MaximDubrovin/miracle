
/* Get miracle's properties */
M.getProps = {

    init: function(miracle) {
        var props, typicalProps, selfProps, mergedProps;

        /* Check if miracle inherits properties from another miracle */
        if (miracle.inherit) {
            typicalProps = M.getProps.inherit(miracle);
            selfProps = M.getProps.self(miracle);
            mergedProps = $.extend({}, typicalProps, selfProps);

            /* Merging props available to give developer power
             to rewrite and extend inherited properties */
            props = mergedProps;
        } else {
            selfProps = M.getProps.self(miracle);
            props = selfProps;
        }

        return props
    },

    inherit: function(miracle) {
        var $typicalMiracle, typicalProps, elemId;

        /* Try to find $typicalMiracle and typicalProps using miracle.inherit value */
        if (miracle.inherit == 'prev') {
            /* Firstly suppose tha value is 'prev' */
            $typicalMiracle = miracle.$.prev('.miracle');
            if ($typicalMiracle) {
                typicalProps = $typicalMiracle.data();
            }
        } else {
            /* Secondly suppose the value is another miracle «data-m-id» parameter */
            elemId = "[data-m-id='" + miracle.inherit + "']";

            $typicalMiracle = $(elemId);
            if ($typicalMiracle.length) {
                typicalProps = $typicalMiracle.data();
            }
        }

        return typicalProps
    },

    self: function(miracle) {
        return miracle.$.data();
    }
}