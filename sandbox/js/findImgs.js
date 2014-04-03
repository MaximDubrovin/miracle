
M.findImgs = {

    init: function(miracle) {
        /* allImgs — it is jQuery object collection of miracle image dependencies presented
         as <img /> elements. Note: css background images will be also presented as <img /> elements
         through simulation for convenient load event handling */

        var allImgs, imgElems, bgImgs;

        if (miracle.$.is('img')) {
            allImgs = miracle.$
        } else {
            imgElems = M.findImgs.imgElems(miracle);
            bgImgs = M.findImgs.bgImgs(miracle);

            allImgs = imgElems;
            if (bgImgs.length) {
                for (var i = 0, l = bgImgs.length; i < l; i++) {
                    allImgs = allImgs.add(bgImgs[i]);
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

    bgImgs: function(miracle) {
        /* find all css background image dependencies
         & return them as array of img elements */

        var bgImgs = [],
            miracleAndChildren = miracle.$.find('*').add(miracle.$);

        miracleAndChildren.each(function() {
            var $element = $(this),
                bgImgUrls = M.parseBgImgUrls($element),
                bgImgUrl,
                $img;

            if (bgImgUrls.length) {
                for (var i = 0, l = bgImgUrls.length; i < l; i++ ) {
                    bgImgUrl = bgImgUrls[i];
                    /* simulate bg imgs as <img/> elements */
                    $img = $('<img/>').attr('src', bgImgUrl);
                    bgImgs.push($img);
                }
            }
        });

        return bgImgs;
    }
}
