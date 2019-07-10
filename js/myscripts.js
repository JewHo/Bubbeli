let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });



$('.collapse').on('shown.bs.collapse', function(e) {
  var $card = $(this).closest('.card');
  $('html,body').animate({
    scrollTop: $card.offset().top
  }, 500);
});




  var container = $(".sort-list");
  var upcoming = $(".upcoming");
  var past = $(".past");
  var items = $(".sort-item");
  var today = new Date();
today.setHours(0,0,0,0);

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

    if (+($(this).attr("gigDate")) >= +(today.getTime())) {
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

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", offset);
}
