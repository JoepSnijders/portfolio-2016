var st = 0, ph = 0, sdegree = 0;
$('.page').scroll(function(event){
  var st = $(this).scrollTop();
  var ph = $(this).height();
  var hh = $(this).find('.page__header').height();
  var fh = $(this).find('.footer').height();
  var fyes = ph - fh;
  var sdegree = (st/ph)*2.5;
  if (st >= hh) {
    $(".header--fixed").addClass("dark-header");
  } if (st < hh) {
    $(".header--fixed").removeClass("dark-header");
  }
  $(".page__header__image").css("transform", "translateY(" + sdegree + "%)");
});


$(document).ready(function() {
    // Check URL
    redirect(window.location.hash);
    // Fade In Posts
    $('.slide-in').each(function(i){
      var self = this;
      setTimeout(function(){
        $(self).addClass('faded');
      }, i*400);
    });
    $('.fade-in').each(function(i){
      var self = this;
      setTimeout(function(){
        $(self).addClass('faded');
      }, 600+i*400);
    });
});

// Page Intro Animations
function startPageIntro(identifier){
  $(".page__header__image").css("transform", "translateY(0%)"); // Reset parallax.
  if (identifier.length != 0) { // If Identifier Exists
    $('#' + identifier + ' .page-slide-in').each(function(i){
      var self = this;
      setTimeout(function(){
        $(self).addClass('page-faded');
      }, 500 + (i*400));
    });
    $('#' + identifier + ' .page-fade-in').each(function(i){
      var self = this;
      setTimeout(function(){
        $(self).addClass('page-faded');
      }, 350);
    });
  }
}
// Toggle Page
function togglePage(identifier){
  window.location = "#" + identifier;
  $("#" + identifier).toggleClass("page--active"); // Toggle Fixed Headerbar
  $("body").toggleClass("fixate"); // Toggle Scroll Lock
  $(".page__header__image").css("transform", "translateY(" + sdegree + "%)"); // Reset Page Header
  startPageIntro(identifier);
}
// Close Page
function closePage(){
  // Reset Hash
  history.pushState("", document.title, window.location.pathname + window.location.search);
  $("body").removeClass("fixate"); // Remove Scroll Lock
  $(".page--active").removeClass("page--active"); // Remove Page
  $(".page-slide-in").removeClass("page-faded"); // Reset Animation
}
// Slide next project
function slideNextProject(from, to){
  window.location = "#" + to; // Set hashtag
  fromObject = $("#" + from);
  toObject = $("#" + to);
  toObject.addClass('page--active'); // Activates new screen
  fromObject.removeClass('page--active');
  $(".page__header__image").removeClass("page-faded"); // Reset Animation Before Start
  startPageIntro(to);
}
// Redirect
function redirect(hash) {
  hash = window.location.hash.substring(1);
  togglePage(hash);
}

// Detect hash changes (back button fix)
function locationHashChanged() {
    if (location.hash === "") {
        closePage();
    }
}
window.onhashchange = locationHashChanged;

// Scroll to
function scrollTo(loc){
  $('html, body').animate({
    scrollTop: $('.' + loc).offset().top -0
  }, {
    duration: 800,
    easing: 'easeInOutQuart'
  });
}
