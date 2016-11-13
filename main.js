var screenWidth;
var screenHeight;
// Initial Load
$(document).ready(function() {
  screenHeight = $(window).height();
  screenWidth = $(window).width();
  updateScreenSize(screenWidth, screenHeight);

  // Starting animation
  $("#home .slide-in").each(function(index){
    var self = this;
    setTimeout(function(){
      $(self).addClass("animated");
    }, 400*index)
  });
});
// Change screen size
$( window ).resize(function() {
  screenHeight = $(window).height();
  screenWidth = $(window).width();
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

function openProject(name){
  $(".single-pages").addClass("active");
}
function closeProject(name){
  $(".single-pages").removeClass("active");
}
