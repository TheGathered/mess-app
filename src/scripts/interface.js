// scroll To
(function() {

	var scroll_to = function(target) {
		var $target = $(target);

		if ($target.length) {
			var offset = $target.offset().top;
			$('html, body').stop().animate({
				scrollTop: offset
			}, 800);
		}
	};

	$('[data-scroll]').on('click', function(e) {
		
		e.preventDefault();
		var target = $(this).attr('data-scroll');
		scroll_to(target);

	});


	var hash = document.location.hash;
	if (typeof hash!=undefined&&hash!='') {
		scroll_to(hash);
	}

})();


// video popup; magnific-popup lib.
$(document).ready(function() {
  $('.popup-trigger').magnificPopup({
    disableOn: function() {
      if( $(window).width() < 600 ) {
        return false;
      }
      return true;
    },
    items: [
      {
        src: 'samples/video.mp4'
      },
  //      {
  //        src: 'samples/video.mp4',
  //      },
  //      {
  //        src: 'samples/video.mp4',
  //      },
  //      {
  //        src: 'samples/video.mp4',
  //      },
    ],
    // content type
    type: 'iframe',
    
    // Class to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});

// get hovers on touch
$(document).ready(function() {
  $('body').bind('touchstart', function() {});
});