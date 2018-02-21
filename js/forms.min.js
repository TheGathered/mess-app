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
/*
	load Article page
	used Library:
	----------------------------------------------------------------------- */
(function() {

  //load article page
  $(document).delegate('[data-load]', 'click', function() {
    var href = $(this).attr('href');
    var $target = $('[data-target="article"]');

    $('body').addClass('page--load');

    // $.get(href, function(response) {
    setTimeout(function() {
      var response = $('[data-source="article"]').html();
      $target.html(response);

      var $article = $target.find('.page-wrapper');

      setTimeout(function() {
        $('body').removeClass('page--load').addClass('page--loaded');
        $article.one('bsTransitionEnd', function() {
          $('body').addClass('page--showed');
          $('.social-likes').socialLikes();
          $(document).trigger('articleLoaded');
        });
      }, 100);

      // });
    }, 500);

    return false;
  });

  //close article page
  $(document).delegate('.articleButtonClose', 'click', function(e) {
    console.log('test', e.target);
    var $target = $('[data-target="article"]');
    $('body').removeClass('page--showed').addClass('page--hide');
    var $article = $target.find('.page-wrapper');
    $article.one('bsTransitionEnd', function() {
      $('body').removeClass('page--loaded page--hide');
      $target.empty();
    });
  });	

  // ----------------------------------------------------------------------





  //load work page
  $(document).delegate('[load-work]', 'click', function() {
    var href = $(this).attr('href');
    var $target = $('[data-target="work"]');

    $('body').addClass('page--load');

    // $.get(href, function(response) {
    setTimeout(function() {
      var response = $('[data-source="work"]').html();
      $target.html(response);

      var $work = $target.find('.page-wrapper');

      setTimeout(function() {
        $('body').removeClass('page--load').addClass('page--loaded');
        $work.one('bsTransitionEnd', function() {
          $('body').addClass('page--showed');
          //$('.social-likes').socialLikes();
          $(document).trigger('articleLoaded'); ///
        });
      }, 100);

      // });
    }, 500);

    return false;
  });

  //close work page
  $(document).delegate('.workButtonClose', 'click', function() {
    var $target = $('[data-target="work"]');
    $('body').removeClass('page--showed').addClass('page--hide');
    var $work = $target.find('.page-wrapper');
    $work.one('bsTransitionEnd', function() {
      $('body').removeClass('page--loaded page--hide');
      $target.empty();
    });
  });

})();
//# sourceMappingURL=forms.js.map
