/*
	used Library:
	- http://dotdotdot.frebsite.nl/
	----------------------------------------------------------------------- */
(function() {

	var init = function() {

		$('.item-post').filter(':not(.ready)').each(function() {
			var $item = $(this);

			$item
				.addClass('ready')
				.find('[data-ellipsis]').dotdotdot({
					ellipsis: ' \u2026',
					truncate: 'word',
					watch: true
				});

		});
	
	};

	init();

	$(document).bind('itemsLoaded', function() {
		init();
	});
	
})();
// ----------------------------------------------------------------------


