
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
