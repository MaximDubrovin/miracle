# Miracle 1.0.0

[Download latest release](https://github.com/MaximDubrovin/miracle/releases)

Miracle plugin gives you control over elements appearance. Wait when element's img dependencies loaded, other element's show effect ended or when you programmatically trigger element's show start then show element with super-customizable show effects. 

[Basic example](http://maximdubrovin.github.io/miracle/build/e/basic.html)
 
Declare with ease right in element attributes: 
- predefined customizable show effects
- fully customizable show effects
- complex show order between many elements
- spinner before show 
- show timeouts
- properties inheritance between miracles

_Plugin needs jQuery 1.10.2 or later. Earlier versions are not tested with Miracle._

__API navigation__
- Predefined effects
  - [data-m-effect](#data-m-effect--predefined-effect-name)
  - [data-m-duration](#data-m-duration--time-in-ms)
  - [data-m-easing](#data-m-easing--any-valid-transition-timing-function-value)
  - [data-m-scale-init](#data-m-scale-init--value-from-0-to-infinity)
  - [data-m-origin](#data-m-origin--any-valid-transform-origin-value)
  - [data-m-translate](#data-m-translate--any-valid-translate-value)
- Custom effects
  - [data-m-style-init](#data-m-style-init--css-declarations)
  - [data-m-style-final](#data-m-style-final--css-declarations)
- [data-m-opaque](#data-m-opaque--true)
- [data-m-spinner](#data-m-spinner--true)
- [data-m-id](#data-m-id--type-what-you-want)
- Await
  - [data-m-await-load](#data-m-await-load--m-id-or-prev)
  - [data-await-show](#data-m-await-show--m-id-or-prev)
- [data-m-timeout](#data-m-timeout--time-in-ms)
- [data-m-inherit](#data-m-inherit--m-id)

# How it works?

[Download latest release](https://github.com/MaximDubrovin/miracle/releases)

Add this to ```<head/>```:
````html
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/spin.js"></script> <!-- optional -->
<script src="js/miracle.min.js"></script>
````

Assign class «miracle» to element:
```html
<div class="miracle">...</div>
```

On page load plugin waits when all image dependencies of miracle loaded then shows miracle with effect.

Images dependencies: 
- ```<img/> ``` elements 
- css ```background-image``` & ```background``` declarations with ```url()```
- multiple backgrounds are handled too

Without image dependencies miracle shows immediately according to declared properties (effect, custom effect, await, show timeout etc.)

You can customize miracle appearance behavior in declarative way right in html using ```data-``` attributes. You say — plugin works.

_Example:_
```html
<div class="miracle" data-m-effect="from-space" 
data-m-duration="444" data-m-await-show="prev" 
data-m-timeout="111" data-m-spinner="true">...<div>
```

# API

## Plugin defaults

All miracles (elements with class «miracle») initially hidden using ```opacity: 0```.

Miracles have __implicitly declared properties__ which plugin needs to create basic show effect:
- ```data-m-effect="fade-in"```
- ```data-m-duration="500"```
- ```data-m-easing="ease-in-out"```

## Predefined show effects

Choose one that you like. Predefined effects designed to work without any customization but if you want there all what you need — 
[Predefined effects settings](https://github.com/MaximDubrovin/Miracle#predefined-effects-settings).

#### data-m-effect = «predefined effect name»
Default: «fade-in»

Predefined effects names:
- __fade-in__: Transition from ```opacity: 0``` to ```opacity: 1```.

- __ease-y__: Transition from ```scaleY(0.9)``` to ```scaleY(1)``` gives elegant presentation effect.

- __ease-x__: Transition from ```scaleX(0.9)``` to ```scaleX(1)``` gives elegant presentation effect.
  
- __from-space__: Miracle lands from outer space like apps icons on iOS. Transition from ```scale(3)```, ```translate(-200px)``` to ```scale(1)``` and original position.

- __from-hell__:
Miracle comings from hell like a devil. Transition from ```scale(0)```, ```translate(-200px)``` to ```scale(1)``` and original position.

- __slide__: Miracle comings from another position. Transition from``` translate(0px,-200px)``` to original position. This effect doesn't make sense without setting [data-m-translate](https://github.com/MaximDubrovin/Miracle#data-m-translate--any-valid-translate-value)

_Example:_
```html
<div class="miracle" data-m-effect="from-space">...</div>
```

## Predefined effects settings
_These properties work only with predefined effects._
### Effect duration

How long effect should lasts.

#### data-m-duration = «time in ms»
Default: «500»

_Example_:
```html
<div class="miracle" data-m-effect="ease-y" 
data-m-duration="333">...</div>
```

### Effect easing

You can set your own transition easing for predefined effect.
 
#### data-m-easing = «any valid ```transition-timing-function``` value»
Default: «ease-in-out»

_Example:_
```html
<div class="miracle" data-m-effect="ease-y" 
data-m-easing="cubic-bezier(0.1, 0.7, 1.0, 0.1)">...</div>
<div class="miracle" data-m-effect="ease-y" 
data-m-easing="linear">...</div>
```

### Initial scale

You can set initial scale of element for predefined effect.

#### data-m-scale-init = «value from 0 to infinity»
Affected effects:
- __ease-y__: Initial ```scaleY()``` value

Default: «0.9»

- __ease-x__: Initial ```scaleX()``` value

Default: «0.9»

- __from-space__: Initial ```scale()``` value

Default: «3»

- __from-hell__: Initial ```scale()``` value

Default: «0»

- __scale__: Initial ```scale()``` value

Default: «0.5»

_Example:_
```html
<div class="miracle" data-m-effect="scale" data-m-scale-init="0.2">...</div>
```

### Transform origin

You can set the origin for transformations of an element for predefined effect.

#### data-m-origin = «any valid ```transform-origin``` value»
Affected effects:
- __ease-y__: Origin for ```scaleY()``` transformation

Default: «center»

- __ease-x__: Origin for ```scaleX()``` transformation

Default: «center»

- __from-space__: Origin for ```scale()``` transformation

Default: «center»

- __from-hell__: Origin for ```scale()``` transformation

Default: «center»

- __scale__: Origin for ```scale()``` transformation

Default: «center»

_Example:_
```html
<div class="miracle" data-m-effect="scale" data-m-origin="left top">...</div>
```

_Note:_

If «x-offset» presented, but «y-offset» doesn't then «y» mimics «x».  

### Translate
You can set the values for initial state's translate transformations of predefined effect. From that position miracle effect will start.

#### data-m-translate = «any valid ```translate()``` value»

Affected effects:
- __from-space__: Values for initial state's ```translate()```.

Default: «-200px, -200px»


- __from-hell__: Values for initial state's ```translate()```.

Default: «-200px, -200px»

- __slide__: Values for initial state's ```translate()```.

Default: «0px, -200px»

_Example:_
```html
<div class="miracle" data-m-effect="slide" data-m-translate="-400px, -400px">...</div>
```

## Custom effects
You can set your own show effect in two steps.

Declare initial style of miracle:

#### data-m-style-init = «css declarations»

_Example:_
```html
<div class="miracle" data-m-style-init="opacity: 0;
-webkit-transform: scale(0) translateX(-200px)
translateY(-200px);">...</div>
```

Declare final style of miracle. How user should see miracle at the end of effect:

#### data-m-style-final = «css declarations»

_Example:_
```html
<div class="miracle" data-m-style-final="opacity: 1;
-webkit-transform: scale(1) translateX(0) translateY(0);
-webkit-transition: opacity 600ms ease-in-out, 
-webkit-transform 600ms ease-in-out;">...</div>
```

_Note:_
- take care about vendor prefixes
- if ```data-m-effect``` presented then custom effect will be ignored.
- miracles initially has ```opacity: 0``` (See [«Plugin defaults»](https://github.com/MaximDubrovin/Miracle#plugin-defaults))

### Make miracle initially opaque

All miracles (elements with class «miracle») initially hidden using ```opacity: 0```. But sometimes you may want to rewrite this default or rewrite inherited property.

#### data-m-opaque = "true"

_Example:_
```html
<div class="miracle" data-m-opaque="true">
```

## Spinner

#### data-m-spinner = "true"

Plugin can show spinner at the center of miracle position until miracle show effect begins. 

_You should add [spin.js](http://fgnass.github.io/spin.js/) plugin (not included in Miracle plugin) in ```<head/>``` before ```miracle.js```_

_Example:_
```html
<head>
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/spin.js"></script>
<script src="js/miracle.js"></script>
</head>
<body>
<div class="miracle" data-m-spinner="true">
</body>
```

_Note:_
- Miracle should have ```position: relative```, because spinner will be centered inside miracle with ```position: absolute; width: 0px; left: 50%; top: 50%```.
- If there is no ```spin.js``` in HTML — there won't be a spinner.

## Miracle id (m-id)

It is utility miracle property. It doesn't affect miracle appearance. Properties like «data-m-await-show» or «data-m-inherit» need it.

#### data-m-id = «type what you want»

_Example:_
```html
<div class="miracle" data-m-id="godzilla">...</div>
<div class="miracle" data-m-await-show="godzilla">...</div>
```

In case above second miracle will await when miracle with m-id «godzilla» will be shown then it shows himself.

_Example:_
```html
<div class="miracle" data-m-id="godzilla" 
data-m-effect="from-space" data-m-duration="444" 
data-m-spinner="true">...</div>
<div class="miracle" data-m-inherit="godzilla">...</div>
````

In case above second miracle inherits ```data-m-effect```, ```data-m-duration``` and ```data-m-spinner``` properties from miracle with m-id «godzilla».

## Await another miracle or own trigger

Miracle can await when another miracle will be «loaded» or «shown» before start to show himself or own trigger. You can run complex ordered miracles orchestra. Declare and Conquer.

#### data-m-await-load = «m-id» or "prev"

Miracle waits when miracle with specified m-id or just previous miracle will be loaded then shows himself.

_Example:_
```html
<div class="miracle" data-m-id="first">...</div>
<div class="miracle" data-m-await-load="first">...</div>
```

### Mutual ```data-m-await-load```
Two miracles can await each other «loaded» signal and show synchronously.

```html
<div class="miracle" data-m-id="yellow" data-m-await-load="red">...</div>
<div class="miracle" data-m-id="red" data-m-await-load="yellow">...</div>
```

#### data-m-await-show = «m-id» or "prev"

Miracle waits when miracle with specified m-id or just previous miracle will be shown then shows himself

_Example:_
```html
<div class="miracle" data-m-id="first">...</div>
<div class="miracle" data-m-await-show="first">...</div>
```

_Note:_

«m-id» of awaited miracle can't be "prev".

#### data-m-await-trigger = "true"

Miracle doesn't start to show himself until your programmatically command to him from your code.

How to command to show miracle whenever you want:

```javascript
$('#some-id').trigger('m-ready');
```

_Example:_
```html
<div id="some-id" class="miracle" data-m-await-trigger="first">...</div>
```
```javascript
$('#some-id').trigger('m-ready');
```

## Show timeout

Before shows himself miracle can wait some time after all other delays. 

#### data-m-timeout = «time in ms»

_Example:_
```html
<div class="miracle" data-m-timeout="1000">...</div>
```

## Properties inheritance

One miracle can inherit other miracle properties. You don't need to repeat the similar properties between similar miracles. Especially bad case may be when your need to pollute your code with repeating same custom effect. 

One miracle which lend properties called «typical», one which borrow properties called «similar».

#### data-m-inherit = «m-id»

_Example:_
```html
<div class="miracle" data-m-id="typical-miracle" 
data-m-effect="ease-y" data-m-duration="333" 
data-m-spinner="true">
<div class="miracle" data-m-inherit="typical-miracle">
<div class="miracle" data-m-inherit="typical-miracle">
```

Second and third miracles will have the same properties as «typical-miracle»: ```data-m-effect="ease-y" data-m-duration="333" data-m-spinner="true"```

### Rewrite and extend inherited properties

_Example:_
```html
<div class="miracle" data-m-id="typical-miracle" 
data-m-effect="ease-y" data-m-duration="333" 
data-m-spinner="true">
<div class="miracle" data-m-inherit="typical-miracle" 
data-m-duration="111" data-m-await="typical-miracle">
```

Second miracle inherits all «typical-miracle» properties, rewrites ```data-m-duration``` property and extends his properties with ```data-m-await="typical-miracle"```.

# Browser support
Supported: Modern webkit browsers, Firefox, IE 11. 

In other browsers page loads as usual, without any special appearance.

# Contributing
- «master» branch contains last stable build that corresponds to the latest [release](https://github.com/MaximDubrovin/miracle/releases).
- «dev» branch contains stuff under development (plugin js and other supportive things) that later will be merged with «master». May not correspond with my local changes in «dev» branch.
- «gh-pages» branch is just a «dev» copy for github pages of project.

### How to build
1. Ensure that you have the latest [Node.js](nodejs.org) installed.
2. Fork and clone repo.
3. Run ```npm install``` in «grunt» directory.
4. Run ```grunt build-plugin``` to build plugin js from «sandbox/js» files. You can find builded «miracle.js» & «miracle.min.js» in «build/js» directory. Run «grunt watch-changes».
5. Edit files only in «sandbox» directory. Grunt compiles all to «build» directory (js, css from sass, imgs, htmls).
6. If you want add another js file (new module for plugin) to «sandbox/js» then you should include file path to this js file to «Gruntfile.js» ```<%= meta.js %>```
7. It's convenient to run «grunt run-server» and go to «http://0.0.0.0:9001/test.html» in browser for testing your js build. «test.html» uses files from «build» directory.

Look at other grunt tasks in «Gruntfile.js» for various purposes.

### Submitting pull requests
1. Create a new branch, please don’t work in your «master» branch directly.
2. Add stuff. Follow the conventions you see used in the source already.
3. Push to your fork and submit a pull request to Miracle’s develop branch.

# Warning:
- Plugin occupies ```M``` global variable.