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
$( document ).ready(function() {
  
  $('#waypoint1').waypoint(function(direction) {

    if (direction ==='down') {
      //$(".test").css('opacity', '0');
      //$(".test-1").css('opacity', '1');
      $(".test").fadeOut("fast");
      $(".test-1").fadeIn("slow");
    }
    else {
      //$(".test").css('opacity', '1');
      //$(".test-1").css('opacity', '0');
      $(".test").fadeIn("slow");
      $(".test-1").fadeOut("fast");
    }
  },{
    //context: document.getElementById('overflow-scroll'),
//    offset: 120
  });
  
  $('#waypoint2').waypoint(function(direction) {

    if (direction ==='down') {
      //$(".test").css('opacity', '0');
      //$(".test-1").css('opacity', '1');
      $(".test-1").fadeOut("fast");
      $(".test-2").fadeIn("slow");
    }
    else {
      //$(".test").css('opacity', '1');
      //$(".test-1").css('opacity', '0');
      $(".test-1").fadeIn("slow");
      $(".test-2").fadeOut("fast");
    }
  },{
    //context: document.getElementById('overflow-scroll')
  });
  
  $('#waypoint3').waypoint(function(direction) {

    if (direction ==='down') {
      //$(".test-2").fadeOut("fast");
      //$("#overflow-scroll").fadeOut("fast");
      //$(".test-2").css('display', 'none');
      $(".test-2").fadeOut("fast");
      $(".test-3").fadeIn("slow");
      
      var scrollTop = $(window).scrollTop();
      console.log(scrollTop);
    }
    else {
      //$(".test").css('opacity', '1');
      //$(".test-1").css('opacity', '0');
      $(".test-2").fadeIn("slow");
      $(".test-3").fadeOut("fast");
    }
//    if (direction ==='up') {
//      //$(".test-2").fadeOut("fast");
//      //$("#overflow-scroll").fadeOut("fast");
//      //$(".test-2").css('display', 'none');
//      $("#overflow-scroll").css('display', 'block');
//      $("#overflow-title").css('display', 'block');
//      $(".test-3").fadeOut("fast");
//      
//      var scrollTop = $(window).scrollTop();
//      console.log(scrollTop);
//    }
  },{
//    context: document.getElementById('overflow-scroll'),
//    offsetTop:0
  });

});


//about-mobile
var accordion = new Accordion('.accordion-container', {
  duration: 400,
  showFirst: true
});
var accordion = new Accordion('.accordion-container-team', {
  duration: 400,
  showFirst: true
});



//work-desktop
$( document ).ready(function() {

  if ($("#work").length) {
    //$('body').css('background', '#242733');
    $('body').addClass('ardarts-page');
    //$('nav a').css('color','#fff');
  }
  $(".menu-li-1").hover(function() {
    $('body').removeClass('runon-page grc-page cakemix-page halsa-page');
    $('body').addClass('ardarts-page');
    $(this).children().addClass('active');
  });
  $(".menu-li-2").hover(function() {
    $('body').removeClass('ardarts-page grc-page grc-page halsa-page');
    $('body').addClass('runon-page');
    $(this).children().addClass('active');
  });
  $(".menu-li-3").hover(function() {
    $('body').removeClass('ardarts-page runon-page cakemix-page halsa-page');
    $('body').addClass('grc-page');
    $(this).children().addClass('active');
  });
  $(".menu-li-4").hover(function() {
    $('body').removeClass('ardarts-page runon-page grc-page halsa-page');
    $('body').addClass('cakemix-page');
    $(this).children().addClass('active');
  });
  $(".menu-li-5").hover(function() {
    $('body').removeClass('ardarts-page runon-page grc-page cakemix-page');
    $('body').addClass('halsa-page');
    $(this).children().addClass('active');
  });
});

$(document).ready(function () {
  //window.mySwipe = $('#slider-work').Swipe().data('Swipe');
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      height: 300

     
    });
    //console.log(swiper.activeIndex);
    
    mySwiper.on('slideChange', function () {
      //console.log('slide changed');
      var activeIndex = mySwiper.activeIndex;
      
        //console.log(activeIndex);
      var realIndex = mySwiper.slides.eq(activeIndex).attr('data-swiper-slide-index'); 
        //console.log(realIndex);
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
