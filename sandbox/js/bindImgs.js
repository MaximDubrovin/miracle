
M.bindImgs = function(miracle, allImgs) {

    /* On load each miracle children image dependency
     (img elem src or css bg-img) increment overall loaded images counter of miracle */
    allImgs.on('load', function(e) {
        M.imgsLoadedCounter.increment(miracle);
    });

    /* Detect when browser failed to load image source. */
    allImgs.on('error', function(e) {
        /* Simulate load event to this image dependency to continue animations. */
        M.imgsLoadedCounter.increment(miracle);
        console.log('MIRACLE ERROR: Image dependency was not loaded. To not interrupt overall miracles effects order on page, Miracle will simulate load event for this image. Image url: ' + e.target.src + '. Miracle: ', miracle);
    });
}
