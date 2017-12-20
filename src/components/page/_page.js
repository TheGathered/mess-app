/*
	sections colours
	used Library:
	- http://imakewebthings.com/waypoints
	----------------------------------------------------------------------- */
(function() {

	var $sections = $('[data-colour]');

	if (!$sections.length) return false;


	var changeColour = function(colour) {
		$('body').attr('data-colour', colour);
	};

	var $viewport = $('[data-target="video"]');

	$sections.each(function() {

		var $section = $(this);
		var $text = $section.find('.section-content');
		var colour = $section.attr('data-colour');
		var $video = $section.find('[data-source="video"]');
		var video = false;

		var scroll = function() {
			var block_y = $text.offset().top;
			var block_h = $text.height();
			var viewport_y = $(window).scrollTop();
			var viewport_h = $(window).height();
			var start_y = viewport_y + viewport_h;
			var delta = start_y - block_y;
			var progress = (delta*100/block_h/2).toFixed(2);
			var opacity = 1;
			if (progress<=40) opacity = progress/100;
			if (progress>=70) opacity = (200-progress)/100;
			$text.css('opacity', opacity);
		};

		scroll();
		
		$(window).on('scroll', function() {
			scroll();
		});

		if ($video.length) {

			video = {
				mp4: $video.attr('data-mp4')||false,
				webm: $video.attr('data-webm')||false,
				loop: $video.attr('data-loop')=='true',
				mute: $video.attr('data-mute')=='true'
			};

			if (video.mp4||video.webm) {
				video.html = 	'<video autoplay'+ (video.loop?' loop':'') + (video.muted?' muted':'') + '>' +
												(video.mp4?'<source src="'+ video.mp4 +'" type="video/mp4">':'') +
												(video.webm?'<source src="'+ video.webm +'" type="video/webm">':'') +
											'</video>';
				$('.mobile-video').attr('poster', 'samples/video-poster.png');
			}

		}

		var active = function() {
			$section.addClass('active').siblings('.section').removeClass('active');
			changeColour(colour);
			$viewport.removeClass('video--available video--loaded').parents('.page-viewport').removeClass('video--playing');
			if (video) {
				$viewport.addClass('video--available').html(video.html);
				$viewport.find('video').on('canplaythrough', function() {
					$viewport.addClass('video--loaded');
				});
			}
		};

		var down = new Waypoint.Inview({
		  element: $section.find('[data-marker="section-top"]')[0],
		  enter: function(direction) {
		  	if (direction=='down') active();
		  },
		  // entered: function(direction) {},
		  // exit: function(direction) {},
		  // exited: function(direction) {}
		});

		var up = new Waypoint.Inview({
		  element: $section.find('[data-marker="section-bottom"]')[0],
		  enter: function(direction) {
		  	if (direction=='up') active();
		  },
		  // entered: function(direction) {},
		  // exit: function(direction) {},
		  // exited: function(direction) {}
		});

	});

	$('.btn--play').on('click', function() {
		$viewport.find('video').get(0).play();
		$viewport.parents('.page-viewport').addClass('video--playing');
	});

})();
// ----------------------------------------------------------------------



/*
	page Pages
	used Library:
	- http://imakewebthings.com/waypoints
	----------------------------------------------------------------------- */
(function() {

	var $pages = $('[data-page]');

	if (!$pages.length||$pages.length==1) return false;

	var changePage = function(page) {
		$('body').attr('data-show', page);
		if (page!='main') $('body').removeAttr('data-colour');
	};

	$pages.each(function() {
		var $page = $(this);
		var page = $page.attr('data-page');

		var active = function() {
			$page.addClass('active').siblings('.page').removeClass('active');
			changePage(page);
		};

		var down = new Waypoint.Inview({
		  element: $page.find('[data-marker="page-top"]')[0],
		  enter: function(direction) {
		  	if (direction=='down') active();
		  },
		  // entered: function(direction) {},
		  // exit: function(direction) {},
		  // exited: function(direction) {}
		});

		var up = new Waypoint.Inview({
		  element: $page.find('[data-marker="page-bottom"]')[0],
		  enter: function(direction) {
		  	if (direction=='up') active();
		  },
		  // entered: function(direction) {},
		  // exit: function(direction) {},
		  // exited: function(direction) {}
		});
        
		
		// new waypoint
		
//		//var of = $(window).scrollTop();
//		//console.log(of);
//		var $things = $('#basic-waypoint');
//        $things.waypoint(function(direction) {
//			$('.mobile-viewport').css('opacity', 1);
//            //$('.page-viewport').css('opacity', 0);
//			//$('.mobile-viewport').css('display', 'block');
//			$('.page-viewport').css('display', 'none');
//			//var y = $(window).scrollTop();
//			//console.log(y);
//			
//		  if (direction === 'down') {
//			//$( ".page-viewport" ).animate({ opacity: 1 })
//			$( ".mobile-viewport" ).animate({ opacity: 0 })
//			//$('.mobile-viewport').fadeTo("fast", 0);  
//			//$('.page-viewport').fadeTo("fast", 1);  
//		  }
//		}, {
//		  offset: 800
//		});
//
//		$things.waypoint(function(direction) {
//		  if (direction === 'up') {
//			//$( ".page-viewport" ).animate({ opacity: 0 })
//			//$( ".mobile-viewport" ).animate({ opacity: 1 })    
//		  }
//		}, {
//		  offset: -500
//		});
//


	});


})();
// ----------------------------------------------------------------------


/*
	mobile viewport
	used Library:
	- http://imakewebthings.com/waypoints
	----------------------------------------------------------------------- */
(function() {

	var $viewport = $('.page-viewport');

	if (!$viewport.length) return false;

	var $page = $('[data-page="main"]');

	var pos = false;

	var scroll = function() {
		var y = $(window).scrollTop();
		
		if (y===0) {
			$('.mobile-viewport').css('display', 'block');
			//$('.page-viewport').css('display', 'none');
			$('.page-viewport').css('visibility', 'hidden');
		}
		
		if ((y>=450) && (window.innerWidth < 400)) {
			$('.mobile-viewport').css('display', 'none');
			$('.page-viewport').css('visibility', 'visible');
		} else if (window.innerWidth > 400) {
			$('.page-viewport').css('visibility', 'visible');
		} else {
			$('.mobile-viewport').css('display', 'block');
			$('.page-viewport').css('visibility', 'hidden');
		}
		
		if (y>=2900) {
			$('.page-viewport').css('visibility', 'hidden');
		}
		
		if (y>=75) {
			$page.addClass('viewport--moved');
			
		} else {
			$page.removeClass('viewport--moved');
		}
		//if (y>=150)
		if (y>=450) {
			pos = y;
			$page.addClass('viewport--fixed');
		}
		if (pos&&y<pos) {
			pos = false;
			$page.removeClass('viewport--fixed');
		}
		
	};

	scroll();
	$(window).on('scroll', function() {
		scroll();
	});

})();
// ----------------------------------------------------------------------


