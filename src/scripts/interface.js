// scroll To
(function() {

	var scroll_to = function(target) {
		var $target = $(target);

		if ($target.length) {
			var offset = $target.offset().top;
			$('html, body').stop().animate({
				scrollTop: offset
			}, 800);
		}
	};

	$('[data-scroll]').on('click', function(e) {
		
		e.preventDefault();
		var target = $(this).attr('data-scroll');
		scroll_to(target);

	});


	var hash = document.location.hash;
	if (typeof hash!=undefined&&hash!='') {
		scroll_to(hash);
	}

})();

// video popup; magnific-popup lib.

$(document).ready(function() {
  $('.popup-trigger').magnificPopup({
  //delegate: 'a', // child items selector, by clicking on it popup will open
    items: [
      {
        src: 'samples/video.mp4'
      },
//      {
//        src: 'samples/video.mp4',
//      },
//      {
//        src: 'samples/video.mp4',
//      },
//      {
//        src: 'samples/video.mp4',
//      },
    ],
    type: 'iframe',
    // Delay in milliseconds before popup is removed
    removalDelay: 400,
    // Class that is added to popup wrapper and background; make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade',
    //preload: [0,2], // read about this option in next Lazy-loading section
  });
});

//$(document).ready(function() {
//  if ((screen.width < 600) && $(".section").data('colour') == 'white') {
//    $( ".page-viewport" ).hide();
//  }
//});


//$(document).ready(function() {
//  var myId = $("section").attr('class');
//  if ($("section").hasClass("active") && $("section").hasClass("section--start")) {
//    $( ".page-viewport" ).hide();
//    
//    //alert( myId );
//  }
//  else if ($("section").hasClass("active") || $("section").hasClass("section--gc")) {
//    alert('f');
//  }
//});


//$("section").hasClass("active")

//$(document).ready(function() {
//  if ($('body').data('colour') == 'white') {
//    //alert('y');
//    console.log('white');
//    //$( ".page-viewport" ).hide();
//    //$( ".home-wp" ).show();
//  }
//  else if (($('body').data('colour') == 'dark')) {
//    alert('yy');
//    console.log('dark');
//  }
//})
