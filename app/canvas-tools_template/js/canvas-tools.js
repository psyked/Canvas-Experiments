var canvasTools = (function () {

    'use strict';
//    var privateVariable = 'canvasTools app fired!',
//        docElem = document.documentElement;
    var loadFunction = function () {
//        console.log('on load');
        var image = $('#largeImage')[0];
        var colorThief = new ColorThief();
        var colorCount = 8;
        var keyColor = colorThief.getColor(image);
        var color = colorThief.getPalette(image, colorCount, 255);
//        console.log(color.length);
        var colors = keyColor.concat(color);
        for (var i = 0, l = colors.length; i < l; i++) {
            $('<div></div>').css({
                width: (100 / colorCount) + '%',
//                width: 'auto',
                height: 64,
                background: 'rgb(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ')',
                float: 'left'
            }).insertAfter('#largeImage');
        }
    };

    return {
        init: function () {
//            console.log('init');
            $('#largeImage').on('load', loadFunction);
            loadFunction();
//        },
//        userAgentInit: function () {
//            docElem.setAttribute('data-useragent', navigator.userAgent);
        }
    };

})();

//(function () {
$(document).ready(function () {

    'use strict';

    //foundation init
    $(document).foundation();

    canvasTools.init();
//    canvasTools.userAgentInit();

});