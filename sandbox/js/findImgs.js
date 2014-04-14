
M.findImgs = {

    init: function(miracle) {
        /* allImgs — it is jQuery object collection of miracle image dependencies presented
         as <img /> elements. Note: css background images will be also presented as <img /> elements
         through simulation for convenient load event handling */

        var allImgs, imgElems, cssImgs;

        if (miracle.$.is('img')) {
            allImgs = miracle.$
        } else {
            imgElems = M.findImgs.imgElems(miracle);
            cssImgs = M.findImgs.cssImgs(miracle);

            allImgs = imgElems;
            if (cssImgs.length) {
                for (var i = 0, l = cssImgs.length; i < l; i++) {
                    allImgs = allImgs.add(cssImgs[i]);
                }
            }
        }

        return allImgs
    },

    imgElems: function(miracle) {
        /* find all img elements dependencies
         & return them as jQuery object collection */

        return miracle.$.find('img');
    },

    cssImgs: function(miracle) {
        /* find all css images dependencies
         & return them as array of img elements */

        var cssImgs = [],
            miracleAndChildren = miracle.$.find('*').add(miracle.$);

        miracleAndChildren.each(function() {
            var $element = $(this),
                cssImgUrls = M.parseImgUrls($element),
                cssImgUrl,
                $img;

            if (cssImgUrls.length) {
                for (var i = 0, l = cssImgUrls.length; i < l; i++ ) {
                    cssImgUrl = cssImgUrls[i];
                    /* simulate bg imgs as <img/> elements */
                    $img = $('<img/>').attr('src', cssImgUrl);
                    cssImgs.push($img);
                }
            }
        });

        return cssImgs;
    }
}
