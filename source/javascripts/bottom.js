// Menu Animations

$("nav div").hover(
  function() { 
    $(this).animate({ top: "-51px" }, { queue: false, duration: 300 });
  },
  function() {
    $(this).animate({ top: "0" }, { queue: false, duration: 300 });
  }
);

// Modals
//
var $modalTriggers = $(".modal-trigger");
var modalNames = [];

$modalTriggers.on("click", function() {
  var target = $.trim($(this).attr("class").replace("modal-trigger", ""));
  $target = $("#" + target);
  $target.css("display", "block");
  $target.find(".close a").on("click", function(e) {
    $(this).parents(".modal").css("display", "none");
    e.preventDefault();
  });
});

// Carousel

var carousel = {
  articleWidth: 730,
  articleLeftMargin: 15
};

// LOL this is the funniest javascript style in the history of mankind...
// Attach the numbers of each article to a corresponding button and also
// get the total number of panels while you're at it...

carousel.total = $("nav ul li").each(function(index) {
  $(this).data("articleIndex", index);
}).length;

$("nav ul li").click(function() {
  // Get the location you wish it the section to animate to
  carousel.targetPosition =
    $(this).data("articleIndex") * (carousel.articleWidth + carousel.articleLeftMargin) - carousel.articleLeftMargin;
  // Animate the m0f0!
  $("section").animate(
    { left: -carousel.targetPosition },
    {
      duration: 1000,
      queue: false
    }
  );
});

// Clear form on click of "clear" button
$(".clear").click(function(e) {
  $(".contact-form form input[type='text'], .contact-form form textarea").val("");
  $(".error-box").html("");
  e.preventDefault();
});

// intercept the submit
$(".contact-form").submit(function(e) {
	e.preventDefault();
});

$(".show-form").click(function(e){
	$(".contact-form").show();
	$(".message-sent").hide();
	e.preventDefault();
});

// Carousel Init
$("#carouselMe").carousel(
  {
    panelWidth: 681,
    animationDuration: 1300
  }
);

$("form input[type='text']").placeholderShiv();

var validator = new FormValidator('contact_form', [{
    name: 'fullname',
    display: 'Name',    
    rules: 'required'
}, {
    name: 'phone',
	display: 'Contact number',
    rules: 'required|alpha_numeric'
},{
    name: 'email',
    display: 'Email',
    rules: 'required|valid_email'
},{
    name: 'message',
    rules: 'required'
}], function(errors, event) {
    if (errors.length > 0) {
	    var errorString = '';        
        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            errorString += errors[i].message + '<br />';
        }
        $(".error-box").html(errorString);
	}
	else{
		$(".error-box").html("");
		var postData = $('form[name=contact_form]').serialize();
		$.ajax({
			type: "POST",
			url: $('form[name=contact_form]').attr('action'),
			data: postData,
			success: function(msg){
				$(document).ajaxComplete(function(event, request, settings){
					if (msg = 'OK'){
						// alert("Message has been sent");
						$(".contact-form").hide();
						$(".message-sent").show();
					}
					else{
						alert("Error sending message");
						$("#contact-form").hide();
					}
				});
			}
		});
	}
});
