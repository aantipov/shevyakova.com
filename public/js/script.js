Shadowbox.init({
    // skip the automatic setup again, we do this later manually
    skipSetup: true
});
$(document).ready(function () {
    if ($('#gallery-wrapper').length) {
        $('a.lbox').each(function () {
            Shadowbox.setup(this, {
                overlayOpacity: 0.8,
                title: $(this).attr('data-title')
            });
        });

        $("img.lazy").show().lazyload({ threshold: 100, effect: "fadeIn" });
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