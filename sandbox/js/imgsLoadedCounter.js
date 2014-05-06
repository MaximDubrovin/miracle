
M.imgsLoadedCounter = {

    increment: function(miracle) {
        miracle.imgsLoadedCounter++;

        /* Wait until all images dependencies are loaded */
        if (miracle.imgsLoadedCounter >= miracle.imgsLength) {
            miracle.$.trigger('m-loaded');
        }
    }
}