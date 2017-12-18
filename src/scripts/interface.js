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

//$(window).scroll(function(){
//    var top = ($(window).scrollTop() > 0) ? $(window).scrollTop() : 1;
//    $('.fade').stop(true, true).fadeTo(0, 1 / (top/2000));
//    $('.fade').css('top', top * 1);             
//});

//var divs = $('.test');
//$(window).scroll(function(){
//   if($(window).scrollTop()>50){
//         divs.stop(true,true).fadeIn("fast");
//   } else {
//         divs.stop(true,true).fadeOut("fast");
//   }
//});

//$(window).scroll(function(){
//    var top = ($(window).scrollTop() > 0) ? $(window).scrollTop() : 1;
//    $('.test-title').stop(true, true).fadeTo(0, 1 / top);
//    $('.test-title').css('top', top * 1.3);             
//});


$(document).ready(function() {
	//if ($( "body" ).data( "data-show", "awards" )) {
	if ($( "body" ).attr('data-show') == 'awards'){
		
		console.log('y');	
	}
	else {
		//$('.test-title').css('display', 'none');
		console.log('n');
	}
  });

//function togglediv(id) {
//    var div = document.getElementById(id);
//    div.style.display = div.style.display == "none" ? "block" : "none";
//}