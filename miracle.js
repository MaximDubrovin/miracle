/*
 Miracle 1.0.5, 07.05.14 00:48
 © 2014, Maxim Dubrovin,  License — https://github.com/MaximDubrovin/miracle/blob/dev/LICENSE-MIT.md 
*/

/* Miracle plugin home — object under global variable */
M = {};

/* Plugin Settings home */
M.settings = {
    miracleClass: ".miracle",
    miraclesDefaultStyle: ".miracle { opacity: 0; }",
    spinnerFadeTimeout: 111,
    effectDuration: 500,
    easing: {
        'default': 'ease-in-out',
        'ease-y': 'ease-out',
        'ease-x': 'ease-out'
    },
    spinner: {
        style: {
            def: {
                lines: 9, // The number of lines to draw
                length: 6, // The length of each line
                width: 2, // The line thickness
                radius: 6, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1.6, // Rounds per second
                trail: 72, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: true, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9 // The z-index (defaults to 2000000000)
            }
        }
    }
};

/* Plugin «global» variables home */
M.vars = {
    miracleStyleElem: undefined,
    dfd: {
        loaded: {},
        shown: {},
        triggered: {}
    }
};

/* Initialize (starts) plugin. Executes when the DOM is fully loaded. */
M.init = function() {


    /* Find all miracles */
    var miracles = $(M.settings.miracleClass);

    if (miracles.length) {
        /* Without miracles — there is nothing to do */

        M.createStyleElem();

        miracles.each(function() {
            /* miracle — object which collects jQuery object & all miracle properties */
            var miracle = {},
                $this = $(this),
                allImgs;


            /* Props defined by plugin for further usage */
            miracle.$ = $(this);
            miracle.name = M.getUniqueName();
            miracle.$.data('m-name', miracle.name);
            M.vars.dfd.loaded[miracle.name] = $.Deferred();
            M.vars.dfd.shown[miracle.name] = $.Deferred();
            M.vars.dfd.triggered[miracle.name] = $.Deferred();
            miracle.imgsLoadedCounter = 0;
            miracle.spinner = {};

            /* Get props declared by developer */
            miracle.inherit = miracle.$.data('m-inherit');
            miracle.props = M.getProps.init(miracle);
            miracle.effect = miracle.props.mEffect;
            miracle.style = {
                init: miracle.props.mStyleInit,
                final: miracle.props.mStyleFinal
            };
            miracle.easing = miracle.props.mEasing;
            miracle.opaque = miracle.props.mOpaque;
            miracle.scaleInit = miracle.props.mScaleInit;
            miracle.origin = miracle.props.mOrigin;
            miracle.translate = miracle.props.mTranslate;
            miracle.duration = miracle.props.mDuration;
            miracle.awaitTrigger = miracle.props.mAwaitTrigger;
            miracle.awaitLoad = miracle.props.mAwaitLoad;
            miracle.awaitShow = miracle.props.mAwaitShow;
            miracle.timeout = miracle.props.mTimeout;
            miracle.spinner.use = miracle.props.mSpinner;
            miracle.spinner.style = miracle.props.mSpinnerStyle;

            M.defineSelectors(miracle);

            /* Binds should go before any triggers. Binds setups when
            miracle's deferreds should be resolved */
            M.bindEvents(miracle);

            /* Prepare setups what should be done when miracle's
            deferred resolved */
            M.showMiracle.prepare(miracle);

            allImgs = M.findImgs.init(miracle);

            miracle.imgsLength = allImgs.length;

            if (allImgs.length) {
                M.bindImgs(miracle, allImgs);
            } else {
                miracle.$.trigger('m-loaded');
            }
        });
    }
}

/* Get miracle's properties */
M.getProps = {

    init: function(miracle) {
        var props, typicalProps, selfProps, mergedProps;

        /* Check if miracle inherits properties from another miracle */
        if (miracle.inherit) {
            typicalProps = M.getProps.inherit(miracle);
            selfProps = M.getProps.self(miracle);
            mergedProps = $.extend({}, typicalProps, selfProps);

            /* Merging props available to give developer power
             to rewrite and extend inherited properties */
            props = mergedProps;
        } else {
            selfProps = M.getProps.self(miracle);
            props = selfProps;
        }

        return props
    },

    inherit: function(miracle) {
        var $typicalMiracle, typicalProps, elemId;

        /* Try to find $typicalMiracle and typicalProps using miracle.inherit value */
        if (miracle.inherit == 'prev') {
            /* Firstly suppose tha value is 'prev' */
            $typicalMiracle = miracle.$.prev('.miracle');
            if ($typicalMiracle) {
                typicalProps = $typicalMiracle.data();
            }
        } else {
            /* Secondly suppose the value is another miracle «data-m-id» parameter */
            elemId = "[data-m-id='" + miracle.inherit + "']";

            $typicalMiracle = $(elemId);
            if ($typicalMiracle.length) {
                typicalProps = $typicalMiracle.data();
            }
        }

        return typicalProps
    },

    self: function(miracle) {
        return miracle.$.data();
    }
}

M.findImgs = {

    init: function(miracle) {
        /* allImgs — it is jQuery object collection of miracle image dependencies presented
         as <img /> elements. Note: css background images will be also presented as <img /> elements
         through simulation for convenient load event handling */

        var allImgs, imgElems, cssImgs;

        if (miracle.$.is('img')) {
            allImgs = miracle.$
        } else {
            imgElems = M.findImgs.imgElems(miracle);
            cssImgs = M.findImgs.cssImgs(miracle);

            allImgs = imgElems;
            if (cssImgs.length) {
                for (var i = 0, l = cssImgs.length; i < l; i++) {
                    allImgs = allImgs.add(cssImgs[i]);
                }
            }
        }

        return allImgs
    },

    imgElems: function(miracle) {
        /* find all img elements dependencies
         & return them as jQuery object collection */

        return miracle.$.find('img');
    },

    cssImgs: function(miracle) {
        /* find all css images dependencies
         & return them as array of img elements */

        var cssImgs = [],
            miracleAndChildren = miracle.$.find('*').add(miracle.$);

        miracleAndChildren.each(function() {
            var $element = $(this),
                cssImgUrls = M.parseImgUrls($element),
                cssImgUrl,
                $img;

            if (cssImgUrls.length) {
                for (var i = 0, l = cssImgUrls.length; i < l; i++ ) {
                    cssImgUrl = cssImgUrls[i];
                    /* simulate bg imgs as <img/> elements */
                    $img = $('<img/>').attr('src', cssImgUrl);
                    cssImgs.push($img);
                }
            }
        });

        return cssImgs;
    }
}


/* Plugin uses $.Deferred() for events.
Each miracle has several deferreds:
dfd for «m-loaded» event — M.vars.dfd.loaded[miracle.name]
dfd for «m-shown» event — M.vars.dfd.loaded[miracle.name] */
M.bindEvents = function(miracle) {
    /* binds should go before any triggers */

    miracle.$.on('m-loaded', function() {

        miracle.$.data('m-loaded', true);

        if (M.vars.dfd.loaded[miracle.name]) {
            M.vars.dfd.loaded[miracle.name].resolve('m-loaded');
        }
    });

    miracle.$.on('m-shown', function() {

        miracle.$.data('m-shown', true);

        if (M.vars.dfd.shown[miracle.name]) {
            M.vars.dfd.shown[miracle.name].resolve('m-shown');
        }
    });

    miracle.$.on('m-show', function() {

        miracle.$.data('m-show', true);

        if (M.vars.dfd.triggered[miracle.name]) {
            M.vars.dfd.triggered[miracle.name].resolve('m-triggered');
        }
    });
}



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


M.showMiracle = {

    /* Prepare setups what should be done when miracle's
     deferred resolved */
    prepare: function(miracle) {
        M.spinner.show(miracle);

            if (miracle.awaitTrigger) {
                M.showMiracle.await.trigger(miracle);
            } else if (miracle.awaitShow) {
                /* should miracle await when other miracle will be shown? */
                M.showMiracle.await.show(miracle);
            } else if (miracle.awaitLoad) {
                /* should miracle await when other miracle will be loaded? */
                M.showMiracle.await.load(miracle);
            } else {
                var miracleDfdName = miracle.name;

                /* don't await any other miracle — show as fast as loaded */
                if (M.vars.dfd.loaded[miracleDfdName]) {
                    M.vars.dfd.loaded[miracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-loaded') {
                            M.showMiracle.show(miracle);
                        }
                    });
                }
            }
    },

    await: {

        load: function(miracle) {
            var $awaitedMiracle, awaitedId, miracleDfdName, awaitedMiracleDfdName;

            /* find awaited miracle */
            if (miracle.awaitLoad == 'prev') {
                $awaitedMiracle = miracle.$.prev('.miracle');
            } else {
                awaitedId = "[data-m-id='" + miracle.awaitLoad + "']";
                $awaitedMiracle = $(awaitedId);
            }

            if ($awaitedMiracle.hasClass('miracle')) {
                miracleDfdName = miracle.name;
                awaitedMiracleDfdName = $awaitedMiracle ? $awaitedMiracle.data('m-name'): {};

                //console.log($awaitedMiracle,miracleDfdName, awaitedMiracleDfdName);

                /* Miracle should be notified when it is loaded and
                 when awaited miracle is loaded. So there inverted check from
                 both deferred events */

                /* deferred from miracle that awaits */
                if (M.vars.dfd.loaded[miracleDfdName]) {
                    M.vars.dfd.loaded[miracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-loaded') {
                            /* 'm-loaded' comes from miracle so
                             we need also know when awaited miracle is loaded  */

                            //console.log('loaded', miracleDfdName)

                            if ($awaitedMiracle.data('m-loaded')) {
                                M.showMiracle.show(miracle);
                            }
                        }
                    });
                }

                /* deferred from awaited miracle */
                if (M.vars.dfd.loaded[awaitedMiracleDfdName]) {
                    M.vars.dfd.loaded[awaitedMiracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-loaded') {
                            /* 'm-shown' comes from awaited miracle so
                             we need also know when miracle is loaded  */

                            //console.log('loaded', awaitedMiracleDfdName)

                            if (miracle.$.data('m-loaded')) {
                                M.showMiracle.show(miracle);
                            }
                        }
                    });
                }
            } else {
                console.log('MIRACLE ERROR: There is no miracle to await for this miracle:', miracle);
                M.showMiracle.show(miracle);
            }
        },

        show: function(miracle) {
            var $awaitedMiracle, awaitedId, miracleDfdName, awaitedMiracleDfdName;

            /* find awaited miracle */
            if (miracle.awaitShow == 'prev') {
                $awaitedMiracle = miracle.$.prev('.miracle');
            } else {
                awaitedId = "[data-m-id='" + miracle.awaitShow + "']";
                $awaitedMiracle = $(awaitedId);
            }

            if ($awaitedMiracle.hasClass('miracle')) {
                miracleDfdName = miracle.name;
                awaitedMiracleDfdName = $awaitedMiracle ? $awaitedMiracle.data('m-name'): {};

                /* Miracle should be notified when it is loaded and
                 when awaited miracle is shown. So there inverted check from
                 both deferred events */

                /* deferred from miracle that awaits */
                if (M.vars.dfd.loaded[miracleDfdName]) {
                    M.vars.dfd.loaded[miracleDfdName].done(function(eType) {
                         if (eType && eType == 'm-loaded') {
                            /* 'm-loaded' comes from miracle so
                             we need also know when awaited miracle is shown  */

                             //console.log('loaded', miracleDfdName)

                             if ($awaitedMiracle.data('m-shown')) {
                                M.showMiracle.show(miracle);
                             }
                         }
                    });
                }

                /* deferred from awaited miracle */
                if (M.vars.dfd.shown[awaitedMiracleDfdName]) {
                    M.vars.dfd.shown[awaitedMiracleDfdName].done(function(eType) {
                        if (eType && eType == 'm-shown') {
                            /* 'm-shown' comes from awaited miracle so
                             we need also know when miracle is loaded  */

                            //console.log('shown', awaitedMiracleDfdName)

                            if (miracle.$.data('m-loaded')) {
                                M.showMiracle.show(miracle);
                            }
                        }
                    });
                }
            } else {
                console.log('MIRACLE ERROR: There is no miracle to await for this miracle:', miracle);
                M.showMiracle.show(miracle);
            }
        },

        trigger: function(miracle) {
            var miracleDfdName = miracle.name;

            if (M.vars.dfd.triggered[miracleDfdName]) {
                M.vars.dfd.triggered[miracleDfdName].done(function(eType) {
                    if (eType && eType == 'm-triggered') {
                        /* triggered miracle shows immediately */
                        M.showMiracle.show(miracle);
                    }
                });
            }
        }
    },

    show: function(miracle) {
        /* Each miracle has unique attributes (data-m-rule-init & data-m-rule-final)
         based on miracle unique name.
         When all miracle ready to show — selector like [data-m-rule-init( and final)= "unique name"]
         adds to Miracle plugin <style/> element in <head/>.
         It causes miracle appearance. */

        var timeout, spinnerFadeTimeout;

        /* Check for miracle show timeout */
        miracle.timeout ? timeout = miracle.timeout : timeout = 0;

        /* Check for miracle spinner fade timeout
         (timeout for spinner smooth consistent «fade out» animation) */
        miracle.spinner ? spinnerFadeTimeout = M.settings.spinnerFadeTimeout : spinnerFadeTimeout = 0;

        setTimeout(function() {
            M.spinner.hide(miracle);

            /* Timeout 0 or greater before creating initial of miracle state is necessary
             to apply initial state effect state  */
            M.vars.miracleStyleElem[0].innerHTML += M.buildRule.state.init(miracle);

            setTimeout(function() {
                M.vars.miracleStyleElem[0].innerHTML +=M.buildRule.state.final(miracle);
                M.markAsShown(miracle);
            }, spinnerFadeTimeout);
        }, timeout);
    }
}


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


M.spinner = {

    show: function(miracle) {
        if (typeof Spinner != 'undefined' && miracle.spinner.use) {
            var spinnerStyle, spinnerStyleName;

            /* (trick) Because we can't make opaque spinner inside transparent miracle
             we need to make miracle opaque until miracle show starts */
            miracle.$.css('opacity', '1');
            miracle.$.css('visibility', 'hidden');

            /* Check for custom spinner style */
            if (miracle.spinner.style) {
                spinnerStyleName = miracle.spinner.style;
                if (M.settings.spinner.style[spinnerStyleName]) {
                    spinnerStyle = M.settings.spinner.style[spinnerStyleName];
                } else {
                    spinnerStyle = M.settings.spinner.style.def;
                }
            } else {
                spinnerStyle = M.settings.spinner.style.def;
            }

            /* Create spinner */
            miracle.spinner.this = new Spinner(spinnerStyle).spin();

            /* Get spinner element */
            miracle.spinner.$ = $(miracle.spinner.this.el);

            /* Styles to center spinner inside miracle */
            miracle.spinner.$.css({
                top: '50%',
                left: '50%',
                visibility: 'visible'
            });

            /* Add spinner inside miracle */
            miracle.$[0].appendChild(miracle.spinner.this.el)
        }
    },

    hide: function(miracle) {
        if (typeof Spinner != 'undefined' && miracle.spinner.use) {
            var spinnerFadeTimeout = M.settings.spinnerFadeTimeout;

            /* (trick) Remove styles which made spinner visible. See M.showSpinner */
            miracle.$.css('opacity', '');
            miracle.$.css('visibility', '');

            /* make spinner fade out smooth */
            var transition = 'opacity ' + M.settings.spinnerFadeTimeout + 'ms ' + ' ease-in-out';
            miracle.spinner.$.css({
                transition: transition,
                opacity : 0
            });

            setTimeout(function() {
                /* timeout for smooth spinner fade out before spinner stopping */
                miracle.spinner.this.stop();
            }, spinnerFadeTimeout);
        }
    }
}


/* Plugin creates <style/> element in <head/> for further
 using as separate place for miracles styles. */
M.createStyleElem = function() {
    var styleElemId = 'miracle-plugin-style',
        styleElem = $("<style type='text/css'></style>");

    styleElem.attr('id', styleElemId);
    styleElem.appendTo('head');

    M.vars.miracleStyleElem = $(styleElem[0]);
    M.vars.miracleStyleElem[0].innerHTML = M.settings.miraclesDefaultStyle;
}


/* Define selectors for two miracle rules to animate from initial(1) to to final(2) state
 (usage example: transform scale from 0 to 1) */
M.defineSelectors = function(miracle) {
    miracle.$.attr('data-m-rule-init', miracle.name);
    miracle.$.attr('data-m-rule-final', miracle.name);

}

M.getUniqueName = function() {
    /* need for miracle.name — unique «id» for miracle
    to define selectors (M.defineSelectors) */
    return Math.random().toString(36).substr(2,9);
}

/* Signalise that miracle's show effect ended */
M.markAsShown = function(miracle) {
    var timeout;
    miracle.duration ? timeout = miracle.duration : timeout = M.settings.effectDuration;
    setTimeout(function() {
        /* Wait for show animation and mark as shown on animation end */
        miracle.$.trigger('m-shown');
    }, timeout);
}


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


/* Initializes (starts) plugin when the DOM is fully loaded. */
$(function() {
    M.init()
});


M.imgsLoadedCounter = {

    increment: function(miracle) {
        miracle.imgsLoadedCounter++;

        /* Wait until all images dependencies are loaded */
        if (miracle.imgsLoadedCounter >= miracle.imgsLength) {
            miracle.$.trigger('m-loaded');
        }
    }
}