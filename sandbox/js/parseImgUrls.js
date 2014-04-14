
M.parseImgUrls = function($element) {

    /* Parses img urls from computed background-image, list-style-image, border-image-source. */
    var imgDeclars = [],
        imgDeclar,
        imgs,
        img,
        urls = [],
        url,
        urlRE = /url\(["']?.*?["']?\)/g;

    if ($element.css('background-image') != "none") {
        imgDeclars.push($element.css('background-image'))
    }

    if ($element.css('list-style-image') != "none") {
        imgDeclars.push($element.css('list-style-image'))
    }

    if ($element.css('border-image-source') != "none") {
        imgDeclars.push($element.css('border-image-source'))
    }

    if (imgDeclars.length) {
        for (var i = 0, l = imgDeclars.length; i < l; i++ ) {
            imgDeclar = imgDeclars[i];

            imgs = imgDeclar.match(urlRE);

            if (imgs) {
                for (var _i = 0, _l = imgs.length; _i < _l; _i++ ) {
                    img = imgs[_i];
                    /* Cut «url(» & and «)» from «url(..)». It gives plain url.    */
                    url = img.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                    url ? urls.push(url) : {};
                }
            }
        }
    }

    return urls;
}
