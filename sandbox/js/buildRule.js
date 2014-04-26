
M.buildRule = {

    state: {

        init: function(miracle) {
            /* (optional) Plugin builds css rule for initial state of miracle
             (usage example: transform scale from 0 to 1) */

            var initRule = '',
                initRuleSelector, initRuleDeclars;

            initRuleSelector = M.buildRule.selector.init(miracle);
            initRuleDeclars = M.buildRule.declars.init(miracle);
            initRule = initRuleSelector + ' { ' + initRuleDeclars + ' }';

            return initRule;
        },

        final: function(miracle) {
            /* Plugin builds css rule for final state of miracle */

            var finalRule = '',
                finalRuleSelector, finalRuleDeclars;

            finalRuleSelector = M.buildRule.selector.final(miracle);

            finalRuleDeclars = M.buildRule.declars.final(miracle);
            finalRule = finalRuleSelector + ' { ' + finalRuleDeclars + ' }';

            return finalRule;
        }
    },

    selector: {

        init: function(miracle) {
            return "[data-m-rule-init='" + miracle.name + "']";
        },

        final: function(miracle) {
            return "[data-m-rule-final='" + miracle.name + "']";
        }
    },

    declars: {

        init: function(miracle) {

            var declars, declarsPrefixed, opacity, translate,
                scaleInit = miracle.scaleInit,
                effect = miracle.effect,
                customEffect = miracle.style.init;


            /* check «data-m-opaque» */
            if (miracle.opaque) {
                opacity = 'opacity: 1;';
            } else {
                opacity = 'opacity: 0;'
            }

            if (miracle.translate) {
                translate = miracle.translate;
            }


            if (effect == 'fade-in') {
                declars = opacity;
            } else if (effect == 'ease-y') {
                !scaleInit ? scaleInit = '0.9' : {};
                declarsPrefixed = '-webkit-transform: scaleY(' + scaleInit +');';
                declars = declarsPrefixed + opacity + ' transform: scaleY(' + scaleInit +');';
            } else if (effect == 'ease-x') {
                !scaleInit ? scaleInit = '0.9' : {};
                declarsPrefixed = '-webkit-transform: scaleX(' + scaleInit +');';
                declars = declarsPrefixed + opacity + ' transform: scaleX(' + scaleInit +');';
            } else if (effect == 'from-space') {
                !scaleInit ? scaleInit = '3' : {};
                !translate ? translate = '-200px, -200px' : {};
                declarsPrefixed = '-webkit-transform: scale(' + scaleInit + ') translate(' + translate +');';
                declars = declarsPrefixed + opacity + ' transform: scale(' + scaleInit + ') translate(' + translate +');';
            } else if (effect == 'from-hell') {
                !scaleInit ? scaleInit = '0' : {};
                !translate ? translate = '-200px, -200px' : {};
                declarsPrefixed = '-webkit-transform: scale(' + scaleInit + ') translate(' + translate +');';
                declars = declarsPrefixed + opacity + ' transform: scale(' + scaleInit + ') translate(' + translate +');';
            } else if (effect == 'scale') {
                !scaleInit ? scaleInit = '0.3' : {};
                declarsPrefixed ='-webkit-transform: scale(' + scaleInit + ');';
                declars = declarsPrefixed + opacity + ' transform: scale(' + scaleInit + ');';
            } else if (effect == 'slide') {
                !translate ? translate = '0px, -200px' : {};
                declarsPrefixed = '-webkit-transform: translate(' + translate +');';
                declars = declarsPrefixed + opacity + ' transform: translate(' + translate +');';
            } else if (customEffect) {
                declars = customEffect;
            } else {
                declars = opacity;
            }

            return declars;
        },

        final: function(miracle) {

            var declars = '',
                declarsPrefixed = '',
                effect = miracle.effect,
                customEffect = miracle.style.final,
                easing, duration,
                orig = miracle.origin, transfOrig, transfOrigPref,
                trans, transPref, transProps, transDur, transEasing, transPropsPref, transDurPref, transEasingPref;

            if (miracle.easing) {
                easing = miracle.easing;
            } else if (M.settings.easing[effect]) {
                easing = M.settings.easing[effect];
            } else {
                easing = M.settings.easing.default;
            }

            if (miracle.duration) {
                duration = miracle.duration;
            } else {
                duration = M.settings.effectDuration;
            }

            if (orig) {
                transfOrigPref = '-webkit-transform-origin: ' + orig + ";";
                transfOrig = transfOrigPref + ' transform-origin: ' + orig + ";";
            }

            transPropsPref = '-webkit-transition-property: opacity, -webkit-transform;';
            transDurPref = '-webkit-transition-duration: ' + duration + 'ms' + ';';
            transEasingPref = '-webkit-transition-timing-function: ' + easing + ';';
            transPref = transPropsPref + transDurPref + transEasingPref;

            transProps = 'transition-property: opacity, transform;';
            transDur = 'transition-duration: ' + duration + 'ms' + ";";
            transEasing = 'transition-timing-function: ' + easing + ';';
            trans = transProps + transDur + transEasing;

            if (effect == 'fade-in') {
                declars = 'opacity: 1;' + transPref + trans;
            } else if (effect == 'ease-y') {
                !orig ? transfOrig = '-webkit-transform-origin: center; transform-origin: center;': {};
                declarsPrefixed = ' -webkit-transform: scaleY(1);';
                declars = declarsPrefixed + transPref + trans + transfOrig +  ' opacity: 1; transform: scaleY(1); transform-origin: 50% 0;'
            } else if (effect == 'ease-x') {
                !orig ? transfOrig = '-webkit-transform-origin: center; transform-origin: center;': {};
                declarsPrefixed = ' -webkit-transform: scaleX(1);';
                declars = declarsPrefixed + transPref + trans + transfOrig +  ' opacity: 1; transform: scaleX(1); transform-origin: 50% 0;'
            } else if (effect == 'from-hell') {
                !orig ? transfOrig = '-webkit-transform-origin: center; transform-origin: center;': {};
                declarsPrefixed = ' -webkit-transform: scale(1) translate(0);';
                declars = declarsPrefixed + transPref + trans + transfOrig + ' opacity: 1; transform: scale(1) translate(0);';
            } else if (effect == 'from-space') {
                !orig ? transfOrig = '-webkit-transform-origin: center; transform-origin: center;': {};
                declarsPrefixed = ' -webkit-transform: scale(1) translate(0);';
                declars = declarsPrefixed + transPref + trans + transfOrig + ' opacity: 1; transform: scale(1) translate(0);';
            } else if (effect == 'scale') {
                !orig ? transfOrig = '-webkit-transform-origin: center; transform-origin: center;': {};
                declarsPrefixed = '-webkit-transform: scale(1);';
                declars = declarsPrefixed + transPref + trans + transfOrig + ' opacity: 1; transform: scale(1);';
            } else if (effect == 'slide') {
                !orig ? transfOrig = '-webkit-transform-origin: center; transform-origin: center;': {};
                declarsPrefixed = '-webkit-transform: translate(0);';
                declars = declarsPrefixed + transPref + trans + transfOrig + ' opacity: 1; transform: translate(0);';
            } else if (customEffect) {
                declars = customEffect;
            }  else {
                declars = 'opacity: 1;' + transPref + trans;
            }

            return declars;
        }
    }
}
