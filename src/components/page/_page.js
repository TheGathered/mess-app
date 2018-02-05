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
			//if (progress>=70) opacity = (200-progress)/100;
            $text.css('opacity', opacity);
          
          
			var $page = $('[data-page=main]').find('.section--start');
			var $cont = $page.find('.section-content');
			
			if (viewport_h <= 820) {
		      var opacity = 1;
		      $cont.css('opacity', opacity);
		      
              if (progress<=40) opacity = progress/100;
              if (progress>=70) opacity = (200-progress)/100;
              $text.css('opacity', opacity);
			}
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
            //$text.css('transition','opacity 1s linear');
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
      
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentRounded = Math.round(scrollPercent*100);
		
		if (y>=75) {
			$page.addClass('viewport--moved');
			
		} else {
			$page.removeClass('viewport--moved');
		}
      
        if (scrollPercentRounded > 6) {
            $('.mobile-video').css('opacity', 0);
            $('.btn--start').css('opacity', 0);
            $('.play--start').addClass('play--custom');
        } else {
            $('.mobile-video').css('opacity', 1);
            $('.btn--start').css('opacity', 1);
            $('.play--start').removeClass('play--custom');
        }
		
		if (scrollPercentRounded > 8) {
			$page.addClass('viewport--fixed');
		}
        if (y>=350) {
			pos = y;
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
// about-desktop
$( document ).ready(function() {
  
  $('#waypoint1').waypoint(function(direction) {

    if (direction ==='down') {
      //$(".text-1").css('visibility', 'hidden');
      //$(".text-2").css('visibility', 'visible');
      $(".about-main-text").css('opacity', '0');
      $(".about-values-text").css('opacity', '1');
      
      $(".fixed-header-1").css('opacity', '0');
      $(".fixed-header-2").css('opacity', '1');
    }
    else {
      //$(".text-1").css('visibility', 'visible');
      //$(".text-2").css('visibility', 'hidden');
      $(".about-main-text").css('opacity', '1');
      $(".about-values-text").css('opacity', '0');
      
      $(".fixed-header-1").css('opacity', '1');
      $(".fixed-header-2").css('opacity', '0');
      //$(".fixed-header-1").css('display', 'block');
      //$(".fixed-header-2").css('display', 'none');
    }
  },{
    offset: 200
  });
  
  $('#waypoint2').waypoint(function(direction) {

    if (direction ==='down') {
      //$(".text-2").css('visibility', 'hidden');
      //$(".text-3").css('visibility', 'visible');
      $(".about-values-text").css('opacity', '0');
      $(".about-team-text").css('opacity', '1');
      
      $(".fixed-header-2").css('opacity', '0');
      $(".fixed-header-3").css('opacity', '1');
      //$(".fixed-header-2").css('display', 'none');
      //$(".fixed-header-3").css('display', 'block');
    }
    else {
      //$(".text-2").css('visibility', 'visible');
      //$(".text-3").css('visibility', 'hidden');
      $(".about-values-text").css('opacity', '1');
      $(".about-team-text").css('opacity', '0');
      
      $(".fixed-header-2").css('opacity', '1');
      $(".fixed-header-3").css('opacity', '0');
      
      //$(".fixed-header-2").css('display', 'block');
      //$(".fixed-header-3").css('display', 'none');
    }
  },{
    offset: 100
  });
  
  $('#waypoint3').waypoint(function(direction) {

    if (direction ==='down') {
      //$(".fixed-header-3").css('display', 'none');
      
      $(".fixed-header-3").css('opacity', '0');
      //$(".text-3").css('visibility', 'hidden');
      //$(".fixed-contribute").css('visibility', 'visible');
      
      $(".fixed-contribute").css('opacity', '1');
      $(".start--about").css('opacity', '0');
      $(".about-team-text").css('opacity', '0');
    }
    else {  
      //$(".fixed-header-3").css('display', 'block');
      $(".fixed-header-3").css('opacity', '1');
      //$(".text-3").css('visibility', 'visible');
      //$(".fixed-contribute").css('visibility', 'hidden');
      
      $(".fixed-contribute").css('opacity', '0');
      $(".start--about").css('opacity', '1');
      $(".about-team-text").css('opacity', '1');
    }
  },{
    offset: 100
  });

});

// about-mobile
var accordion = new Accordion('.accordion-container', {
  duration: 400,
  showFirst: true
});
var accordion = new Accordion('.accordion-container-team', {
  duration: 400,
  showFirst: true
});


// work-desktop
$( document ).ready(function() {

  if ($("#work").length) {
    $('body').addClass('ardarts-page work-view');
  }
  
  $(".menu-li-1").hover(function() {
    $('body').removeClass('runon-page grc-page cakemix-page halsa-page');
    $('body').addClass('ardarts-page');
    $( ".work-side-text p" ).html('Ar Darts');
    $(this).children().addClass('active');
  });
  $(".menu-li-2").hover(function() {
    $('body').removeClass('ardarts-page grc-page grc-page halsa-page');
    $('body').addClass('runon-page');
    $( ".work-side-text p" ).html('Runon');
    $(this).children().addClass('active');
  });
  $(".menu-li-3").hover(function() {
    $('body').removeClass('ardarts-page runon-page cakemix-page halsa-page');
    $('body').addClass('grc-page');
    $( ".work-side-text p" ).html('GroundC');
    $(this).children().addClass('active');
  });
  $(".menu-li-4").hover(function() {
    $('body').removeClass('ardarts-page runon-page grc-page halsa-page');
    $('body').addClass('cakemix-page');
    $( ".work-side-text p" ).html('Cakemix');
    $(this).children().addClass('active');
  });
  $(".menu-li-5").hover(function() {
    $('body').removeClass('ardarts-page runon-page grc-page cakemix-page');
    $('body').addClass('halsa-page');
    $( ".work-side-text p" ).html('Halsa.Life');
    $(this).children().addClass('active');
  });
});

// work-mobile
$(document).ready(function () {
    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      slidePerView: 'auto',
      //slidesOffsetBefore: 20,
      //effect: 'slide',
      //loopedSlides: 15,
      //spaceBetween: 130,
      centeredSlides: true
    });
    
    mySwiper.on('slideChange', function () {
      // get 'with duplicates' current slide
      var activeIndex = mySwiper.activeIndex;
      // get 'realy' current slide
      var realIndex = mySwiper.slides.eq(activeIndex).attr('data-swiper-slide-index'); 

      if ( realIndex == 0 ) {
        $('body').removeClass('runon-page grc-page cakemix-page halsa-page');
        $('body').addClass('ardarts-page');
      }
      if ( realIndex == 1 ) {
        $('body').removeClass('ardarts-page grc-page grc-page halsa-page');
        $('body').addClass('runon-page');
      }
      if ( realIndex == 2 ) {
        $('body').removeClass('ardarts-page runon-page cakemix-page halsa-page');
        $('body').addClass('grc-page');
      }
      if ( realIndex == 3 ) {
        $('body').removeClass('ardarts-page runon-page grc-page halsa-page');
        $('body').addClass('cakemix-page');
      }
      if ( realIndex == 4 ) {
        $('body').removeClass('ardarts-page runon-page grc-page cakemix-page');
        $('body').addClass('halsa-page');
      }
    })
});
