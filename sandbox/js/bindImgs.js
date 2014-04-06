
M.bindImgs = function(miracle, allImgs) {

    allImgs.on('load', function() {
        /* On load each miracle children image dependency
         (img elem src or css bg-img) increment overall loaded images counter of miracle */

        miracle.imgsLoadedCounter++;

        if (miracle.imgsLoadedCounter >= allImgs.length) {
            /* Wait until all images dependencies are loaded */

            miracle.$.trigger('m-loaded');
        }
    });
}
