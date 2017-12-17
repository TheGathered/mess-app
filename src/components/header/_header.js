/*
	header Shadow
	used Library:
	----------------------------------------------------------------------- */
(function() {

	var $header = $('.header');
	var bordered = $header.hasClass('header--bordered');

	var scroll = function() {
		var y = $(window).scrollTop();

		if (y>=1&&!bordered){
			bordered = true;
			$header.addClass('header--bordered');
		}

		if (y==0&&bordered) {
			bordered = false;
			$header.removeClass('header--bordered');
		}

	};

	$(window).on('load scroll', function() {
		scroll();
	});

})();
// ----------------------------------------------------------------------

