/*
	Brug evt. Twitter Bootstraps:
	http://twitter.github.io/bootstrap/javascript.html#typeahead
*/
//use the keyboard arrows to navigate down the suggestion list
(function ($) {
    $.fn.InstantArrows = function (e) {

        return this.each(function () {

            var target = $(this);
            if ($(this).is(':visible')) {

                // Top state
                if (e.keyCode == 38) {
                    //console.log('top');
                    if (target.find('.active').length == 0 || target.find('.active').is(':first-child')) {
                        //console.log('first time');
                        target.find('.active').removeClass('active');
                        target.find('.dw-search-result:last-child').addClass('active');
                    }
                    else {
                        target.find('.active').removeClass('active').prev().addClass('active');
                    }
                }
                // Bottom state
                else if (e.keyCode == 40) {
                    //console.log('bottom');
                    if (target.find('.active').length == 0 || target.find('.active').is(':last-child')) {
                        //console.log('first time');
                        target.find('.active').removeClass('active');
                        target.find('.dw-search-result:first-child').addClass('active');
                    }
                    else {
                        target.find('.active').removeClass('active').next().addClass('active');
                    }
                }
                //Enter pressed
                else if (e.keyCode == 13 && target.find('.active').length > 0) {
                    var link = target.find('.active a:first-child').attr('href');
                    if (target.attr('id') == 'product-quickadd-instant-search') {
                        e.preventDefault();
                        $("#quickaddinput").val(target.find('.active').find('.dw-search-result-number').html());
                    }
                    else {
                        window.location = link;
                        e.preventDefault();
                    }
                }

                // Hover state
                target.find('.dw-search-result').hover(function () {
                    target.find('.dw-search-result').removeClass('active');
                    $(this).addClass('active');
                })

            }

        })
    }
})(jQuery);
