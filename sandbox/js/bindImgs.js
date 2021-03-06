
M.bindImgs = function(miracle, allImgs) {

    /* On load each miracle children image dependency
     (img elem src or css bg-img) increment overall loaded images counter of miracle */
    allImgs.on('load', function(e) {
        M.imgsLoadedCounter.increment(miracle);
    });

    /* Detect when browser failed to load image source. */
    allImgs.on('error', function(e) {
        e.preventDefault();
        if (miracle.errorStyle) {
            //Mark miracle error.
            //After simulating triggers buildRule.final() will handle error case
            //by assigning errStyle class.
            miracle.loadError = true;

            //Simulate loaded trigger firing to resume other miracles appearance.
            //'m-shown' trigger will be fired after buildRule.final()
            //assigning error style class.
            miracle.$.trigger('m-loaded');
        } else {
            /* Simulate load event to this image dependency to continue animations. */
            M.imgsLoadedCounter.increment(miracle);
            console.log('MIRACLE ERROR: Image dependency was not loaded. To not interrupt overall miracles effects order on page, Miracle will simulate load event for this image. Image url: ' + e.target.src + '. Miracle: ', miracle);
        }
    });
}
