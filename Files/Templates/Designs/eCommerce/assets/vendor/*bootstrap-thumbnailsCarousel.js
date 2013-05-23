!function ($) {
  
  "use strict"; // jshint ;_;

  var _next, _prev;

  $.fn.dwThumbnailsCarousel = function (option) {
    return this.each(function () {
    
      var item_width
        , stop_pos
        , total_items
        , total_width
        , visible_items
        , visible_width
        , _carousel
        , _slider;
   
      _carousel = $(this);
      total_items = _carousel.find('div[class^=span]').length;      
      item_width = _carousel.find('div[class^=span]:first').outerWidth(true);
      
      total_width = item_width * total_items;
      _carousel.find('.item:first').width(total_width); 
      
      visible_items = Math.round(_carousel.find('.carousel-inner').width() / item_width);
      visible_width = visible_items * item_width;
      stop_pos = visible_width - total_width;
      
      _slider = _carousel.find('.item:first');
      _slider.data('to', 0);
      
      // Need Review this code section
      // Implementation of dynamic change full image placeholder
      if (option.enlargeHolder) {
        _slider.find("a").live("click", function (e) {
          e.preventDefault();
          var imgFullSrc = $(this).attr("href");
          var img = $("<img />").attr('src', imgFullSrc).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
              alert('broken image!');
            } else {
              $(option.enlargeHolder).find("img").hide();
              $(option.enlargeHolder).append(img);;
            }
          });      
        });
      }
      _carousel.carousel('pause').on({
        'pln.prev': function() {
          if (_slider.position().left < 0 && _slider.position().left === _slider.data('to')) { 
            _slider.data('to', _slider.position().left + item_width);
            
            _slider.animate({
              left: "+=" + item_width + "px"
            }, 'fast');
          }
          return false;
        },
        'pln.next': function() {
          if (_slider.position().left > stop_pos && _slider.position().left === _slider.data('to')) {
            _slider.data('to', _slider.position().left - item_width);
            _slider.animate({
              left: "-=" + item_width + "px"
            }, 'fast');
          }
          return false;
        }
      });
    })
  }

  $.fn.dwThumbnailsCarousel.Constructor = $.fn.carousel.Constructor;

  _next = $.fn.dwThumbnailsCarousel.Constructor.prototype.next;
  _prev = $.fn.dwThumbnailsCarousel.Constructor.prototype.prev;
  
  $.fn.dwThumbnailsCarousel.Constructor.prototype.next = function() {
    this.$element.trigger('pln.next');
    return _next.call(this);
  };
  $.fn.dwThumbnailsCarousel.Constructor.prototype.prev = function() {
    this.$element.trigger('pln.prev');
    return _prev.call(this);
  };
  
}(window.jQuery);
