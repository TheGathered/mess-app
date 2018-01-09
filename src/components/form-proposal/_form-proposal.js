/*
	form Proposal
	used Library:
	- https://silviomoreto.github.io/bootstrap-select/
	----------------------------------------------------------------------- */
(function() {

	var $form = $('.form--proposal').find('form');

	if (!$form.length) return false;

	var $inps = $form.find('input[type="text"], input[type="email"], input[type="tel"], select');
	var $steps = $form.find('[data-step]');
	var $btns = $form.find('.btn--next, .btn--submit');
	var $phone = $('[data-flag="phone"]');

	//custom selects
	$inps.filter('select').selectpicker({
		style: null
	});

	$form.find('.bootstrap-select').find('.filter-option').each(function() {
		var $label = $(this);
		$label.attr('data-text', $label.text());
        //
        //$form.find('.bootstrap-select').attr('onclick', '');
        //
	});
	
	//long-select 
	var bs_select = $form.find('.bootstrap-select').find('.open');
	$(bs_select).addClass('select--overflow');
	
	var select_ul = $form.find('.bootstrap-select').find('.inner');
	$(select_ul).addClass('list--long');
	//end long-select
	
	$inps.filter('select')
		.on('show.bs.select', function (e) {
	  	$(this).parents('.form-group').addClass('open-select');
	  	$('body').addClass('show--select');
		})
		.on('hide.bs.select', function (e) {
	  	$(this).parents('.form-group').removeClass('open-select');
		})
		.on('hidden.bs.select', function (e) {
	  	$(this).parents('.form-group').find('.dropdown-toggle').blur();
		})
		.on('changed.bs.select', function (e) {
			var $label = $(this).parents('.form-group').find('.filter-option');
			$label.attr('data-text', $label.text());
			if ($phone.is(':visible')) {
		  	$(this).parents('.form-group').addClass('open-selected');
			}
		});		

	$form.find('.btn--close, .btn--apply').on('click', function() {
		$(this).parents('.form-group').removeClass('open-selected');
  	$('body').removeClass('show--select');
	});


	var change_step = function(step) {
		var $step = $steps.filter('[data-step="'+ step +'"]');
		$steps.removeClass('active').hide();
		$step.show();
		setTimeout(function() {
			$step.addClass('active');
		}, 100);
		check_available_button();
	};


	var check_available_button = function() {
		var enable = true;
		$inps.filter('[required]').filter(':visible').each(function() {
			var value = $(this).val();
			if (!value) enable = false;
		});
		$btns.attr('disabled', !enable);
	};


	var send = function() {
		var data = $form.serialize();
		$form.addClass('loading');
		setTimeout(function() {
			$form.removeClass('loading');
			change_step(4);
		}, 1000);
	};


	change_step(1);
	check_available_button();

	$inps.filter('[required]').on('keyup keypress focus blur change', function() {
		check_available_button();
	});


	$btns.filter('[data-next]').on('click', function() {
		var step = $(this).attr('data-next');
		change_step(step);
		
		//prevent-scroll
		if (step >= 2 && step <= 3) {
            $("#press, #awards, #main").hide();
		}
		
	});
  
        $('.header-logo, .tab--work').on('click', function() {
			location.reload();
			$("#press, #awards, #main").delay(1000).show(0);
        });
        //end prevent-scroll
  
	$form.on('submit', function() {
		send();
		return false;
	});


})();