/*
	form Subscribe
	used Library:
	- https://github.com/wagerfield/parallax
	----------------------------------------------------------------------- */
(function() {

	var $bubbles = $('.bubbles');

	if (!$bubbles.length) return false;

	var parallax = false;
	var $phone = $('[data-flag="phone"]');

	var init = function() {
		parallax = new Parallax($bubbles.find('.parallax')[0]);
	};

	var destroy = function() {
		parallax.disable();
		parallax = false;
	};

	var resize = function() {
		if ($phone.is(':visible')&&parallax) destroy();
		if (!$phone.is(':visible')&&!parallax) init();
	};

	resize();

	$(window).on('load resize', function() {
		resize();
	});
	
})();
// ----------------------------------------------------------------------


