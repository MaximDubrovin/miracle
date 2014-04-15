# Release history

## 1.0.0
Initial release

## 1.0.1
### Functionality added
- ```data-m-await-trigger``` 
### Changed
_Internals:_
- Events system started to rely on ```$.Deferred()``` instead of  ```setInterval```.

## 1.0.2
### Functionality added
- ```data-m-spinner-style``` functionality
- Support as image dependencies:
	 - ```list-style-image```
   - ```border-image```
### Changed
__API:__
- ```$('#some-id').trigger('m-ready');``` → ```$('#some-id').trigger('m-show');```
_Internals:_
- new css images parsing method ```M.parseImgUrls```

### Fixed
Fixed #1 — Plugin doesn't wait when images dependencies are loaded on ```v1.0.1```   