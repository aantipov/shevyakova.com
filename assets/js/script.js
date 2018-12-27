(function($) {
  'use strict';
  $(document).ready(function() {
    $('.caption a').on('click', function(ev) {
      // Stop propagation to forbid popup appearance.
      ev.stopPropagation();
    });
    if ($('#gallery-wrapper').length) {
      // Lazy load
      $('img.lazy')
        .show()
        .lazyload({ threshold: 100, effect: 'fadeIn' });
    }
  });
})(jQuery);
