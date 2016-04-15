$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

function animateVisibleObject($window, $elements) {
  
  if($window.length == 0 || $elements.length == 0) return;

  var wHeight = $window.height(),
      wTop = $window.scrollTop(),
      wBottom = (wTop + wHeight);

  $.each($elements, function() {

    var $el = $(this),
        elHeight = $el.outerHeight(),
        elTop = $el.offset().top,
        elBottom = (elTop + elHeight),
        animationClass = 'animated ' + $el.data('apply-animation'),
        delay = $el.data('animation-delay') || 0;

    if ((elBottom >= wTop) && (elTop <= wBottom) && !$el.hasClass(animationClass)) {
      setTimeout(function(){ $el.addClass(animationClass) }, delay);
    }
    
  });
}

function init(){
  
  var $elements = $('[data-apply-animation]'),
      $window = $(window);

  $window.on('scroll resize', function(){
    animateVisibleObject($window, $elements);
  }).trigger('scroll');

}

(function($){

  $(document).ready(init);

})(jQuery);