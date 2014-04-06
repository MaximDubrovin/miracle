
/* Signalise that miracle's show effect ended */
M.markAsShown = function(miracle) {
    var timeout;
    miracle.duration ? timeout = miracle.duration : timeout = M.settings.effectDuration;
    setTimeout(function() {
        /* Wait for show animation and mark as shown on animation end */
        miracle.$.trigger('m-shown');
    }, timeout);
}
