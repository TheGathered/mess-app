/*
	form Subscribe
	used Library:
	----------------------------------------------------------------------- */
(function() {

	var init = function() {

		var $form = $('.form--subscribe').find('form').filter(':visible').filter(':not(.ready)');

		if (!$form.length) return false;

		$form.addClass('ready');

		var $inps = $form.find('input[type="email"], input[type="text"]');
		var $btn = $form.find('button[type="submit"]');


		//check enable Submit button
		var checkEnable = function() {
			var enable = true;
			$inps.filter('[required]').each(function() {
				var value = $(this).val();
				if (!value) enable = false;
			});
			$btn.attr('disabled', !enable);
		};


		//check placeholders
		var checkPlaceholders = function() {
			$inps.each(function() {
				var $inp = $(this);
				var $group = $inp.parents('.form-group');
				var value = $inp.val();
				$group.removeClass('focused').addClass( (value?'focused':'') );
			});
		};


		//send form
		var send = function() {
			var data = $form.serialize();
			$form.addClass('loading');
			setTimeout(function() {
				$form
					.removeClass('loading')
					.find('[data-step="1"]').hide().end()
					.find('[data-step="2"]').show();
			}, 1000);
		};


		checkPlaceholders();
		checkEnable();

		$inps
			.on('focus', function() {
				$(this).parents('.form-group').addClass('focused');
			})
			.on('blur', function() {
				checkPlaceholders();
			});

		$inps.filter('[required]').on('input', function() {
			checkEnable();
		});

		$form.on('submit', function() {
			send();
			return false;
		});
		
	};

	init();

	$(document).bind('articleLoaded', function() {
		init();
	});
  
//    $(document).bind('gcLoaded', function() {
//		init();
//	});

})();
// ----------------------------------------------------------------------


