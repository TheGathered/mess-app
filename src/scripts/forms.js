///*
//	load Article page
//	used Library:
//	----------------------------------------------------------------------- */
//(function() {
//
//  //load article page
//  $(document).delegate('[data-load]', 'click', function() {
//    var href = $(this).attr('href');
//    var $target = $('[data-target="article"]');
//
//    $('body').addClass('page--load');
//
//    // $.get(href, function(response) {
//    setTimeout(function() {
//      var response = $('[data-source="article"]').html();
//      $target.html(response);
//
//      var $article = $target.find('.page-wrapper');
//
//      setTimeout(function() {
//        $('body').removeClass('page--load').addClass('page--loaded');
//        $article.one('bsTransitionEnd', function() {
//          $('body').addClass('page--showed');
//          $('.social-likes').socialLikes();
//          $(document).trigger('articleLoaded');
//        });
//      }, 100);
//
//      // });
//    }, 500);
//
//    return false;
//  });
//
//  //close article page
//  $(document).delegate('.articleButtonClose', 'click', function(e) {
//    console.log('test', e.target);
//    var $target = $('[data-target="article"]');
//    $('body').removeClass('page--showed').addClass('page--hide');
//    var $article = $target.find('.page-wrapper');
//    $article.one('bsTransitionEnd', function() {
//      $('body').removeClass('page--loaded page--hide');
//      $target.empty();
//    });
//  });	
//
//  // ----------------------------------------------------------------------
//
//
//
//
//
//  //load work page
//  $(document).delegate('[load-work]', 'click', function() {
//    var href = $(this).attr('href');
//    var $target = $('[data-target="work"]');
//
//    $('body').addClass('page--load');
//
//    // $.get(href, function(response) {
//    setTimeout(function() {
//      var response = $('[data-source="work"]').html();
//      $target.html(response);
//
//      var $work = $target.find('.page-wrapper');
//
//      setTimeout(function() {
//        $('body').removeClass('page--load').addClass('page--loaded');
//        $work.one('bsTransitionEnd', function() {
//          $('body').addClass('page--showed');
//          //$('.social-likes').socialLikes();
//          $(document).trigger('articleLoaded'); ///
//        });
//      }, 100);
//
//      // });
//    }, 500);
//
//    return false;
//  });
//
//  //close work page
//  $(document).delegate('.workButtonClose', 'click', function() {
//    var $target = $('[data-target="work"]');
//    $('body').removeClass('page--showed').addClass('page--hide');
//    var $work = $target.find('.page-wrapper');
//    $work.one('bsTransitionEnd', function() {
//      $('body').removeClass('page--loaded page--hide');
//      $target.empty();
//    });
//  });
//
//})();
$(document).delegate("[data-load]","click",function(){$(this).attr("href");var e=$('[data-target="article"]');return $("body").addClass("page--load"),setTimeout(function(){var a=$('[data-source="article"]').html();e.html(a);var t=e.find(".page-wrapper");setTimeout(function(){$("body").removeClass("page--load").addClass("page--loaded"),t.one("bsTransitionEnd",function(){$("body").addClass("page--showed"),$(".social-likes").socialLikes(),$(document).trigger("articleLoaded")})},100)},500),!1}),$(document).delegate(".articleButtonClose","click",function(e){console.log("test",e.target);var a=$('[data-target="article"]');$("body").removeClass("page--showed").addClass("page--hide"),a.find(".page-wrapper").one("bsTransitionEnd",function(){$("body").removeClass("page--loaded page--hide"),a.empty()})}),$(document).delegate("[load-work]","click",function(){$(this).attr("href");var e=$('[data-target="work"]');return $("body").addClass("page--load"),setTimeout(function(){var a=$('[data-source="work"]').html();e.html(a);var t=e.find(".page-wrapper");setTimeout(function(){$("body").removeClass("page--load").addClass("page--loaded"),t.one("bsTransitionEnd",function(){$("body").addClass("page--showed"),$(document).trigger("articleLoaded")})},100)},500),!1}),$(document).delegate(".workButtonClose","click",function(){var e=$('[data-target="work"]');$("body").removeClass("page--showed").addClass("page--hide"),e.find(".page-wrapper").one("bsTransitionEnd",function(){$("body").removeClass("page--loaded page--hide"),e.empty()})});