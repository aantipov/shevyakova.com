'use strict';
(function ($) {
  $(document).ready(function () {
    $('.caption a').on('click', function (ev) {
      // Stop propagation to forbid popup appearance.
      ev.stopPropagation();
    });
    if ($('#gallery-wrapper').length) {
      $('.cover').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        },
        image: {
          // options for image content type
          titleSrc: 'data-title'
        },
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below
        zoom: {
          enabled: false, // By default it's false, so don't forget to enable it
          duration: 300, // duration of the effect, in milliseconds
          easing: 'ease-in-out', // CSS transition easing function

          // The "opener" function should return the element from which popup will be zoomed in
          // and to which popup will be scaled down
          // By default it looks for an image tag:
          opener: function (openerElement) {
            // openerElement is the element on which popup was initialized, in this case its <a> tag
            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
            return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        }
      });

      // Lazy load
      $("img.lazy").show().lazyload({threshold: 100, effect: "fadeIn"});
    }

    // Load image on picture page.
    if ($('#picture-wrapper').length) {
      var imgWrapper = $('#picture-wrapper .img-wrapper');
      var src = imgWrapper.attr('data-src');
      var alt = imgWrapper.attr('data-alt');
      imgWrapper.show();
      $('<img />', {
        src: src, alt: alt, load: function () {
          imgWrapper.removeClass('loading');
          var width = $(this).prop('width');
          var height = $(this).prop('height');
          $(this).prop('width', 270).prop('height', 320).css('opacity', 0).appendTo(imgWrapper);
          $(this).animate({width: width, height: height, opacity: 1}, 600);
        }
      });
    }
  });
})(jQuery);