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
	$(document).delegate('.page--article .btn--close', 'click', function() {
		var $target = $('[data-target="article"]');
		$('body').removeClass('page--showed').addClass('page--hide');
		var $article = $target.find('.page-wrapper');
		$article.one('bsTransitionEnd', function() {
			$('body').removeClass('page--loaded page--hide');
			$target.empty();
		});
	});	
})();
// ----------------------------------------------------------------------



(function() {

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
  $(document).delegate('.page--work .btn--close', 'click', function() {
    var $target = $('[data-target="work"]');
    $('body').removeClass('page--showed').addClass('page--hide');
    var $work = $target.find('.page-wrapper');
    $work.one('bsTransitionEnd', function() {
      $('body').removeClass('page--loaded page--hide');
      $target.empty();
    });
  });

})();