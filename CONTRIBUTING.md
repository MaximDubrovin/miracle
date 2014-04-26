# Contributing
- «master» branch contains last stable build that corresponds to the latest [release](https://github.com/MaximDubrovin/miracle/releases).
- «dev» branch contains primary stuff under development (plugin js and other supportive things) that later will be merged with «master». May not correspond with my local changes in «dev» branch.
- «gh-pages» branch is just a «dev» copy for github pages of project.

## How to build
1. Ensure that you have the latest [Node.js](nodejs.org) installed.
2. Fork and clone repo.
3. Run ```npm install``` in «grunt» directory.
4. Run ```grunt build-plugin``` to build plugin js from «sandbox/js» files. You can find builded «miracle.js» & «miracle.min.js» in «build/js» directory. Run «grunt watch-changes».
5. Edit files only in «sandbox» directory. Grunt compiles all to «build» directory (js, css from sass, imgs, htmls).
6. If you want add another js file (new module for plugin) to «sandbox/js» then you should include file path to this js file to «Gruntfile.js» ```<%= meta.js %>```
7. It's convenient to run «grunt run-server» and go to «http://0.0.0.0:9001/test.html» in browser for testing your js build. «test.html» uses files from «build» directory.

Look at other grunt tasks in «Gruntfile.js» for various purposes.

## Submitting pull requests
1. Create a new branch, please don’t work in your «master» branch directly.
2. Add stuff. Follow the conventions you see used in the source already.
3. Push to your fork and submit a pull request to Miracle’s develop branch.
