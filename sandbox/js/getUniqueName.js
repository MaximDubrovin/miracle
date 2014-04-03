
M.getUniqueName = function() {
    /* need for miracle.name — unique «id» for miracle
    to define selectors (M.defineSelectors) */
    return Math.random().toString(36).substr(2,9);
}