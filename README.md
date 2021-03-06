# Miracle 1.1.0

[Download latest release](https://github.com/MaximDubrovin/miracle/releases)

or install via <a href="http://bower.io/" target="_blank">Bower</a>

```
bower install miracle
```

<br>

Miracle plugin gives you control over appearance of elements. Helps you to turn appearance of elements on page load from stuttering chaos to perfect synchronous performance of the symphony.

<a href="http://maximdubrovin.github.io/miracle/build/e/basic.html" target="_blank">Basic example</a>

Long read about problem that Miracle targeted to solve: <a href="https://medium.com/p/ce81143e7a38" target="_blank">«Elements animation on initial page render: CSS animations and load event to the rescue from messy page render»</a> 

Plugin can wait & show element with effect after:
- element's images dependencies loaded 
- other element's show effect ended
- other element's images dependencies loaded   
- trigger from your code 

Declare with ease right in element attributes: 
- built-in customizable show effects
- fully customizable show effects
- complex show order between many elements
- spinner before show 
- show timeouts
- properties inheritance between miracles

_Plugin needs jQuery 1.10.2 or later. Earlier versions are not tested with Miracle._

__API navigation__
- Built-in effects
  - [data-m-effect](#data-m-effect--built-in-effect-name)
  - [data-m-duration](#data-m-duration--time-in-ms)
  - [data-m-easing](#data-m-easing--any-valid-transition-timing-function-value)
  - [data-m-scale-init](#data-m-scale-init--value-from-0-to-infinity)
  - [data-m-origin](#data-m-origin--any-valid-transform-origin-value)
  - [data-m-translate](#data-m-translate--any-valid-translate-value)
- Custom effects: CSS classes approach
  - [data-m-style-init](#data-m-style-init--classname)
  - [data-m-style-final](#data-m-style-final--classname)
- Custom effects: Inline CSS approach
  - [data-m-style-init](#data-m-style-init--inline-css-declarations)
  - [data-m-style-final](#data-m-style-final--inline-css-declarations)
- [data-m-opaque](#data-m-opaque--true)
- [data-m-timeout](#data-m-timeout--time-in-ms)
- Spinner 
  - [data-m-spinner](#data-m-spinner--true)
  - [data-m-spinner-style](#data-m-spinner-style--your-custom-style-name)
- [data-m-id](#data-m-id--name-it-as-you-like)
- Await
  - [data-m-await-load](#data-m-await-load--m-id-or-prev)
  - [data-m-await-show](#data-m-await-show--m-id-or-prev)
  - [data-m-await-trigger](#data-m-await-trigger--true)
- [data-m-inherit](#data-m-inherit--m-id)
- [If one of miracle's image dependencies was not loaded](#if-one-of-miracles-image-dependencies-was-not-loaded)
  - [data-m-error-style](#data-m-error-style--classname)
- [Dynamic elements rendering and Miracle. Manual initialization.](#dynamic-elements-rendering-and-miracle)

## How to use?

[Download latest release](https://github.com/MaximDubrovin/miracle/releases)

or install via [Bower](http://bower.io/)

```
bower install miracle
```

In your ```<html/>``` add this to ```<head/>```:
```html
<head>
...
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/spin.js"></script> <!-- optional -->
<script src="js/miracle.min.js"></script>
...
<head/>
```

Assign class «miracle» to element:
```html
<div class="miracle">...</div>
```

Miracle initializes as soon as DOM is ready. Plugin parses for miracles (elements with class «miracle») and prepares them for special appearance behaviour. Then plugin waits when all image dependencies of miracle will be loaded then shows miracle with effect.

If you want to initialize Miracle manually for dynamically added elements — see [here](#dynamic-elements-rendering-and-miracle)

Images dependencies: 
- ```<img/> ``` elements 
- CSS declarations with ```url("...")``` (shorthands & precise variants): 
   - ```background``` (& ```background-image```; multiple backgrounds are handled too)
   - ```list-style``` (& ```list-style-image```)
   - ```border-image``` (& ```border-image-source```)

Without image dependencies miracle shows immediately according to declared properties (effect, custom effect, await, show timeout etc.)

You can customize miracle appearance behavior in declarative way right in html using ```data-``` attributes. You say — plugin works.

_Example:_
```html
<div class="miracle" data-m-effect="from-space" 
data-m-duration="444" data-m-await-show="prev" 
data-m-timeout="111" data-m-spinner="true">...<div>
```

## API

## Plugin defaults

Some miracles that uses __built-in__ show effects initially hidden using ```opacity: 0```. If you declare [custom effect](#custom-effects) then you need to take care about both initial and final states styles yourself.

Miracles have __implicitly declared properties__ that plugin needs to create basic show effect:
- ```data-m-effect="fade-in"```
- ```data-m-duration="500"```
- ```data-m-easing="ease-in-out"```

## Built-in show effects

Choose one that you like. Built-in effects designed to work without any customization but if you want there all what you need — 
[Built-in effects settings](#built-in-effects-settings).

#### data-m-effect = «built-in effect name»
Default: «fade-in»

Built-in effects names:
- __fade-in__: Transition from ```opacity: 0``` to ```opacity: 1```.

- __ease-y__: Transition from ```scaleY(0.9)``` to ```scaleY(1)``` gives elegant presentation effect.

- __ease-x__: Transition from ```scaleX(0.9)``` to ```scaleX(1)``` gives elegant presentation effect.
  
- __from-space__: Miracle lands from outer space like apps icons on iOS. Transition from ```scale(3)```, ```translate(-200px)``` to ```scale(1)``` and original position.

- __from-hell__:
Miracle comings from hell like a devil. Transition from ```scale(0)```, ```translate(-200px)``` to ```scale(1)``` and original position.

- __scale__: Transition from ```scale(0)``` to ```scaleY(1)```.

- __slide__: Miracle comings from another position. Transition from``` translate(0px,-200px)``` to original position. This effect doesn't make sense without setting [data-m-translate](https://github.com/MaximDubrovin/Miracle#data-m-translate--any-valid-translate-value)

_Example:_
```html
<div class="miracle" data-m-effect="from-space">...</div>
```

## Built-in effects settings
_These properties work only with built-in effects._
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

You can set your own transition easing for built-in effect.
 
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

You can set initial scale of element for built-in effect.

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

Default: «0»

_Example:_
```html
<div class="miracle" data-m-effect="scale" data-m-scale-init="0.2">...</div>
```

### Transform origin

You can set the origin for transformations of an element for built-in effect.

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
You can set the values for initial state's translate transformations of built-in effect. From that position miracle effect will start.

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
You can set your own show effect with CSS classes or inline CSS declarations.

### CSS classes approach
You can use CSS classes from your own stylesheets to create custom show effect.
 
_Note dot before class name._

Declare initial state style of miracle:

#### data-m-style-init = «.className»

_Example:_
```html
<div class="miracle" data-m-style-init=".initialState">...</div>
```

```css
.initialState {
	
	opacity: 0;
	transform: scale(0) translateX(-200px) translateY(-200px);
	
}
```

Declare final state style of miracle. How user should see miracle at the end of effect:

#### data-m-style-final = «.className»

_Example:_
```html
<div class="miracle" data-m-style-final=".finalState">...</div>
```

```css
.finalState {

	opacity: 1;
	transform: scale(1) translateX(0) translateY(0);
	transition-property: opacity, transform;
	transition-duration: 600ms;
	transition-timing-function: ease-in-out;
	
}
```

It's more powerful and convenient then inline CSS approach. Especially if you are using [Autoprefixer](https://github.com/ai/autoprefixer) that automatically adds prefixes to your CSS declarations.

With classes approach it's easy to create elements that responsive to images dependencies loading by deeply modifying element style from your separately defined css classes.

### Inline CSS approach
You can create custom effect right in HTML attributes with inline CSS declarations.

Declare initial style of miracle:

#### data-m-style-init = «inline CSS declarations»

_Example:_
```html
<div class="miracle" 
data-m-style-init="opacity: 0; transform: scale(0) translateX(-200px) translateY(-200px);">...</div>
```

Declare final style of miracle. How user should see miracle at the end of effect:

#### data-m-style-final = «inline CSS declarations»

_Example:_
```html
<div class="miracle" 
data-m-style-final="opacity: 1;	transform: scale(1) translateX(0) translateY(0); transition-property: opacity, transform;transition-duration: 600ms; transition-timing-function: ease-in-out;">...</div>
```

_Note:_
- take care about vendor prefixes
- if built-in ```data-m-effect``` presented then custom effect will be ignored.

### Make miracle initially opaque

Some miracles that use built-in show effects initially hidden using ```opacity: 0```. But sometimes you may want to rewrite it or rewrite inherited property of miracle.

#### data-m-opaque = "true"

_Example:_
```html
<div class="miracle" data-m-opaque="true">
```

## Show timeout

Before shows himself miracle can wait some time after all other delays. 

#### data-m-timeout = «time in ms»

_Example:_
```html
<div class="miracle" data-m-timeout="1000">...</div>
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

#### data-m-spinner-style = «your custom style name»

You can set your own spinner style for miracle and apply this style only to selected miracles.

Go to [spin.js page](http://fgnass.github.io/spin.js/) and configure your spinner style with handy sliders. Under title «Usage» on this page you will see object ```var opts = {...}``` with spinner's style options.

In your ```<html/>``` in ```<head/>``` add ```<script/>``` tag _after_ miracle.js:
```html
<head>
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/spin.js"></script>
<script src="js/miracle.min.js"></script>
<script>
	M.settings.spinner.style.customSpinnerStyle = {
            lines: 5, 
            length: 10,
            width: 2,
						//... etc.
  }
</script>
</head>
```
In this ```<script/>``` tag create ```M.settings.spinner.style.customSpinnerStyle``` object where ```customSpinnerStyle``` is name of your custom spinner style.

Copy your earlier configured spinner options to this object.

Declare ```data-m-spinner-style``` property for miracle with ```customSpinnerStyle``` as value:
```html
<div class="miracle" data-m-spinner="true" 
data-m-style="customSpinnerStyle">...</div>
```

Done. Plugin will use your custom spinner style for this miracle. 

## Miracle id («m-id»)

It is utility miracle property. It doesn't affect miracle appearance. Properties like «data-m-await-show» or «data-m-inherit» need it.

#### data-m-id = «name it as you like»

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

_This could work with custom effects only if you manually declared overall custom effect duration via ```data-m-duration```. With built-in effects ```data-m-await-show``` works fine without this tuning._

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
$('#some-id').trigger('m-show');
```

_Example:_
```html
<div id="some-id" class="miracle" data-m-await-trigger="true">...</div>
```
```javascript
$('#some-id').trigger('m-show');
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

## If one of miracle's image dependencies was not loaded
To not interrupt overall miracles effects order on page, Miracle'll simulate load event for this image, continue to await other image dependencies and finally show miracle. So miracle element will be shown but with gap on not loaded image's place and will look according to your design without this image. Also plugin throws error in console to notify about this case.

<a href="http://maximdubrovin.github.io/miracle/build/e/img_error.html" target="_blank">«Image dependency was not loaded» example</a>

#### data-m-error-style = «.className»

To apply special style for miracle if one of image dependencies failed to load use ```data-m-error-style=".className"```. Where ```.className``` may be any class from your stylesheets. Note dot before class name.

In future there will functionality to choose which types of images dependencies should case error. For example, ```border-image``` may be not so important as ```<img />``` to cause miracle restyling in failed to load case.

##Dynamic elements rendering and Miracle
By default Miracle initializes as soon as DOM is ready. So plugin can't know about all future miracles you'll render dynamically from your code. Especially it is a problem for templates rendering.

To handle dynamically rendered elements you need to initialize Miracle manually as soon as element appended to the page:

```javascript
/* Create  element, turn it to miracle and append element to the page. */
var p = document.createElement("p");
p.className = 'miracle';
document.body.appendChild(p);

/* Initialize Miracle plugin. But firstly check it's avaliability. */
M ? M.init() : {};
```

Imagine you have a [Meteor](https://www.meteor.com/) template with miracles:

```javascript
/* Meteor can say when template elements are rendered.  */
Template.myTemplate.rendered = function ( ) {
	M ? M.init() : {};
}
```

When you trigger Miracle initialization plugin doesn't touch already parsed miracles. It's convenient and efficient.

## Performance
Plugin uses <a href="http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/" target="_blank">hardware accelerated</a>
CSS declarations that should please you with silky smooth 60fps animations.
 
## Browser support
Supported: Modern webkit browsers, Firefox, IE 11. 

In other browsers page loads as usual, without any special appearance.

## Warning:
- Plugin occupies ```M``` global variable.
