var screenWidth;
var screenHeight;
// Initial Load
$(document).ready(function() {
  if (window.location.hash) {
    redirect(window.location.hash);
  }

  screenHeight = $(window).height(); // Update Screen Size
  screenWidth = $(window).width(); // Update Screen Size
  updateScreenSize(screenWidth, screenHeight);
  $("#home").addClass("active");
});

// Change screen size
$( window ).resize(function() {
  screenHeight = $(window).height(); // Update Screen Size
  screenWidth = $(window).width(); // Update Screen Size
  updateScreenSize(screenWidth, screenHeight);
});

// Add screensize to .screen
function updateScreenSize(screenWidth, screenHeight){
  $(".screen").css({"width": screenWidth, "height": screenHeight});
  $(".window").css({width: screenWidth});
}

// Keyboard handling
$(document).keydown(function(e) {
    switch(e.which) {
      case 40: // Down
        selectNextScreen();
      break;
      case 38: //  Up
        selectPrevScreen();
      break;
      case 39: // right
      break;
      case 37: // left
      break;
      default: return;
    }
    e.preventDefault(); // Prevent down scroll.
});

// Scroll detection
var allowScroll = true;
$('.index-pages').on('mousewheel DOMMouseScroll', function(e){
  console.log('scrolling..');
  e.preventDefault();
  if (allowScroll) {
    if(e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) { // Scroll up (Chome or Firefox)
        allowScroll = false;
        selectNextScreen();
        setTimeout(function(){
          allowScroll = true;
        }, 1100);
    } else { // Scroll down
      allowScroll = false;
      selectPrevScreen();
      setTimeout(function(){
        allowScroll = true;
      }, 1100);
    }
    return false;
  } else { // Do not allow scroll yet
    return false;
  }
});
// Touch detection
var lastY;
$('.index-pages').bind('touchmove', function (e){
    if (allowScroll) {
      var currentY = e.originalEvent.touches[0].clientY;
      if(currentY > lastY){
          // moved down
          console.log('down');
          allowScroll = false;
          selectPrevScreen();
          setTimeout(function(){
            allowScroll = true;
          }, 1100);
      }else if(currentY < lastY){
          // moved up
          console.log('up');
          allowScroll = false;
          selectNextScreen();
          setTimeout(function(){
            allowScroll = true;
          }, 1100);
      }
      lastY = currentY;
    } else {
      return false;
    }
});

function selectNextScreen(){
  // Current status
  var thisScreen = $(".screen.active");
  var nextScreen = $(thisScreen).next();
  // Moves to next status
  if (nextScreen.length) { // If next screen exists.
    $(thisScreen).removeClass("active"); // This: Deactivate screen.
    $(thisScreen).addClass("past"); // This: Scroll up.
    $(nextScreen).addClass("active"); // Next: Activate screen.
    $(nextScreen).removeClass("past"); // Next: Remove past if there.
  }
}
function selectPrevScreen(){
  // Current status
  var thisScreen = $(".screen.active");
  var nextScreen = $(thisScreen).prev();
  // Moves to next status
  if (nextScreen.length) { // If next screen exists.
    $(thisScreen).removeClass("active"); // This: Deactivate screen.
    //$(thisScreen).addClass(""); // This: Scroll up.
    $(nextScreen).addClass("active"); // Next: Activate screen.
    $(nextScreen).removeClass("past"); // Next: Remove past if there.
  }
}

function redirect(hash) {
  hash = window.location.hash.substring(1);
  openProject(hash);
}

// Project Pages
function openProject(name){
  window.location = "#" + name;
  $("#" + name).addClass("active");
  $("#" + name).scrollTop(0); // Reset scroll position to top.
  $(".return").addClass("active");
}
function closeProject(){
  history.pushState("", document.title, window.location.pathname + window.location.search); // Reset Hash
  $(".single-page").removeClass("active");
  $(".return").removeClass("active");
}
function toggleMenu() {
  $("#menu").toggleClass("active");
}
