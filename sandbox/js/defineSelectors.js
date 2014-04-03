
/* Define selectors for two miracle rules to animate from initial(1) to to final(2) state
 (usage example: transform scale from 0 to 1) */
M.defineSelectors = function(miracle) {
    miracle.$.attr('data-m-rule-init', miracle.name);
    miracle.$.attr('data-m-rule-final', miracle.name);

}