# Release history

# 1.1.0

### Added functionality
- to apply special style for miracle if one of image dependencies failed to load use ```data-m-error-style=".className"```. Where ```.className``` may be any class from your stylesheets. Note dot before class name.

In future there will functionality to choose which types of images dependencies should case error. For example, ```border-image``` may be not so important as ```<img />``` to cause miracle restyling in failed to load case.

*Also:*

From this release Miracle plugin will support [semantic versioning](http://semver.org/).


# 1.0.7

### Added functionality
- Now Miracle can [efficiently handle](https://github.com/MaximDubrovin/miracle#dynamic-elements-rendering-and-miracle) dynamically added miracles.
- One miracle can await when another miracle's custom show effect ended. [How-to trick](https://github.com/MaximDubrovin/miracle#data-m-await-show--m-id-or-prev). Previously only built-in effects were handled.

### Changed
- Now built-in effect «scale» scales from initial value «0». Was «0.3». Honestly, I don't know why. 

# 1.0.6

### Added functionality
- Now you can use CSS classes from your own stylesheets to create custom show effects. Check out Readme about [benefits it gives](https://github.com/MaximDubrovin/miracle/#css-classes-approach).

### Changed
Plugin defaults changed to minimize your confuse about hidden default styles of miracle.

_Before_:

__All__ miracles (elements with class miracle) were initially hidden using ```opacity: 0```.

_From 1.0.6:_
 
Only some miracles __that use built-in show effects__ initially hidden using ```opacity: 0```. If you declare [custom effect](https://github.com/MaximDubrovin/miracle/#custom-effects) then you need to take care about both initial and final states styles completely yourself.  

# 1.0.5

### Added

- [If one of miracle's image dependencies was not loaded](https://github.com/MaximDubrovin/miracle/blob/master/README.md#if-one-of-miracles-image-dependencies-was-not-loaded) behavior

## 1.0.4

__No new functionality added or API changes in this version__

### Fixed
Fixed issue [#2](https://github.com/MaximDubrovin/miracle/issues/2) — wrong «ease-x» prefixed declarations

## 1.0.3

__No new functionality added or API changes in this version__

### Changed

__Internals:__

- Miracle js dependencies moved to Bower.

### Added
- Install via [Bower](http://bower.io/)

```
bower install miracle
```   

## 1.0.2
### Functionality added

- ```data-m-spinner-style``` functionality
- Support as image dependencies:
	 - ```list-style-image```
   - ```border-image```

### Changed

__API:__

- ```$('#some-id').trigger('m-ready');``` → ```$('#some-id').trigger('m-show');```

__Internals:__

- new css images parsing method ```M.parseImgUrls```

### Fixed
Fixed issue [#1](https://github.com/MaximDubrovin/miracle/issues/1) — Plugin doesn't wait when images dependencies are loaded on ```v1.0.1```

## 1.0.1
### Functionality added

- ```data-m-await-trigger```
 
### Changed

__Internals:__

- Events system started to rely on ```$.Deferred()``` instead of  ```setInterval```.

## 1.0.0

Initial release
