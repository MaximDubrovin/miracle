
M.parseBgImgUrls = function($element) {

    var bgImgDeclar,
        bgImgs,
        bgImg,
        urls = [],
        url,
        urlRE = /url\(["']?.*?["']?\)/g;

    if ($element.css('background-image') != "none") {
        bgImgDeclar = $element.css('background-image');

        /* match returns array of «url(..)» values
        (for multiple backgrounds support) */
        bgImgs = bgImgDeclar.match(urlRE);


        if (bgImgs) {
            for (var i = 0, l = bgImgs.length; i < l; i++ ) {
                bgImg = bgImgs[i];
                /* Cut «url(» & and «)» from «url(..)». It gives plain url.    */
                url = bgImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                url ? urls.push(url) : {};
            }
        }
    }

    return urls;
}
