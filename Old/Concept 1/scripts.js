// Fade In Posts
$(document).ready(function() {
    $('.slide-in').each(function(i){
      var self = this;
      setTimeout(function(){
        $(self).addClass('faded');
      }, i*400);
    });
    $('.fade-in').each(function(i){
      var self = this;
      $(self).addClass('faded');
    });
    // Pick Random 'Hello'
    var items = ['Well hello,','Howdy,','Hoola,','Aye aye,']
    var item = items[Math.floor(Math.random()*items.length)];
    $("#hello").text(item);
    // Check URL
    console.log(window.location.hash);
    redirect(window.location.hash);
});

// Toggle Page
function togglePage(identifier){
  console.log(identifier);
  window.location = "#" + identifier;
  $("#" + identifier).toggleClass("page--active");
  $("body").toggleClass("fixate");
}
// Close Page
function closePage(){
  // Reset Hash
  history.pushState("", document.title, window.location.pathname + window.location.search);
  $("body").removeClass("fixate");
  $(".page--active").removeClass("page--active");
}
// Slide next project
function slideNextProject(from, to){
  from = $("#" + from);
  to = $("#" + to);
  from.css("transform", "translateX(-100px)");
  setTimeout(function (){
    from.css("transform", "translateX(0px)");
  }, 1000)
  from.removeClass('page--active');
  to.addClass('page--active');
}
// Redirect
function redirect(hash) {
  hash = window.location.hash.substring(1);
  console.log(hash);
  // if (hash == "#about"){
  //   togglePage('about');
  // }
  // if (hash == "#contact") {
  //   togglePage('contact');
  // }
  // if (hash == "#invertuals"){
  //   togglePage('invertuals');
  // }
  togglePage(hash);
}

// Detect hash changes (back button fix)
function locationHashChanged() {
    if (location.hash === "") {
        closePage();
    }
}

// Menu hovers
$(".about").hover(function(){
  $(".side-page--about").toggleClass("peek");
});
$(".contact").hover(function(){
  $(".side-page--contact").toggleClass("peek");
});

window.onhashchange = locationHashChanged;
