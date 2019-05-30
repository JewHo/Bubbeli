
  var container = $(".sort-list");
  var upcoming = $(".upcoming");
  var past = $(".past");
  var items = $(".sort-item");
  var today = new Date();

  items.each(function() {
    // Convert the string in 'data-event-date' attribute to a more
    // standardized date format
    var BCDate = $(this).attr("gigDate").split("/");
    var standardDate = $(this).attr("gigDate")
    this.setAttribute("year", BCDate[0]);
    this.setAttribute("month", BCDate[1]);
    this.setAttribute("day", BCDate[2]);
    standardDate = new Date(standardDate).getTime();
    $(this).attr("gigDate", standardDate);

  });

  items.sort(function(a, b) {
    a = parseFloat($(a).attr("gigDate"));
    b = parseFloat($(b).attr("gigDate"));
    return a > b ? -1 : a < b ? 1 : 0;
  }).each(function() {

    this.insertAdjacentText("afterbegin", this.getAttribute("day") + "/" + this.getAttribute("month") + " ");

    if ($(this).attr("gigDate") >= today.getTime()) {
      upcoming.prepend(this);
    } else {
      past.append(this);
    }

  });

  var children = upcoming.children();
  var headingYear = 0;
  for (var i = 0; i < children.length; i++) {
    if (i == 0) {
      children[i].insertAdjacentHTML("beforebegin", "<h6 class='card-title' style='font-family:monospace;'>" + children[i].getAttribute("year") + "</h6>");
      headingYear = children[i].getAttribute("year")
    }
    if (headingYear != children[i].getAttribute("year")) {
      children[i].insertAdjacentHTML("beforebegin", "<br/><h6 class='card-title' style='font-family:monospace;'>" + children[i].getAttribute("year") + "</h6>");
      headingYear = children[i].getAttribute("year")
    }
  }

  var children = past.children();
  var headingYear = 0;
  for (var i = 0; i < children.length; i++) {
    if (i == 0) {
      children[i].insertAdjacentHTML("beforebegin", "<h6 class='card-title' style='font-family:monospace;'>" + children[i].getAttribute("year") + "</h6>");
      headingYear = children[i].getAttribute("year")
    }
    if (headingYear != children[i].getAttribute("year")) {
      children[i].insertAdjacentHTML("beforebegin", "<br/><h6 class='card-title' style='font-family:monospace;'>" + children[i].getAttribute("year") + "</h6>");
      headingYear = children[i].getAttribute("year")
    }
  }



$("#scrolla a[href^='#']").on('click', function(e) {

     // prevent default anchor click behavior
     e.preventDefault();

     // store hash
     var hash = this.hash;

     // animate
     $('html, body').animate({
         scrollTop: $(hash).offset().top
       }, 1000, function(){
       });

  });

$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

$(function() {
var selectedClass = "";
$(".filter").click(function(){
selectedClass = $(this).attr("data-rel");
$("#gallery").fadeTo(100, 0.1);
$("#gallery div").not("."+selectedClass).fadeOut().removeClass('animation');
setTimeout(function() {
$("."+selectedClass).fadeIn().addClass('animation');
$("#gallery").fadeTo(300, 1);
}, 300);
});
});

$("#pop").on("click", function() {
   $('#imagepreview').attr('src', $('#imageresource').attr('src')); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
});

$( 'a a' ).remove();

document.documentElement.setAttribute("lang", "en");
document.documentElement.removeAttribute("class");

axe.run( function(err, results) {
  console.log( results.violations );
} );

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
}
