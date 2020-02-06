/* NAV BAR */



$(function() {
	menu= $('nav .cf');

	$('#openup').on('click', function(e) {
		e.preventDefault(); menu.slideToggle();
	});

	$(window).resize(function(){
		var w = $(this).width();
		if(w > 580 && menu.is(':hidden'))
		{
			menu.removeAttr('style');
		}
	});

	$('.cf li').on('click', function(e)
		{
			var w = $(window).width();
			if(w < 580)
			{
				menu.slideToggle();
			}
		});
	$('.open-menu').height($(window).height());
});

// SMOOTH MOVE

$('.smooth-move').on('click', function(event)
	{
		if (this.hash !=='')
		{
			event.preventDefault();
			const hash = this.hash;
			$('html, body').animate(
				{
					scrollTop: $(hash).offset().top
				},
				800,
				function()
				{
					window.location.hash = hash;
				}
			);
		}
	});


// activate the color of the current section


var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
 
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
 
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});



/* CONTACT FORM */

//material contact form animation
$('.contact-form').find('.form-control').each(function() {
  var targetItem = $(this).parent();
  if ($(this).val()) {
    $(targetItem).find('label').css({
      'top': '10px',
      'fontSize': '14px'
    });
  }
})
$('.contact-form').find('.form-control').focus(function() {
  $(this).parent('.input-block').addClass('focus');
  $(this).parent().find('label').animate({
    'top': '10px',
    'fontSize': '14px'
  }, 300);
})
$('.contact-form').find('.form-control').blur(function() {
  if ($(this).val().length == 0) {
    $(this).parent('.input-block').removeClass('focus');
    $(this).parent().find('label').animate({
      'top': '25px',
      'fontSize': '18px'
    }, 300);
  }
})

$('.contact-form').find('.form-control').each(function() {
  var targetItem = $(this).parent();
  if ($(this).val()) {
    $(targetItem).find('label').css({
      'top': '10px',
      'fontSize': '14px'
    });
  }
})
$('.contact-form').find('.form-control').focus(function() {
  $(this).parent('.input-block').addClass('focus');
  $(this).parent().find('label').animate({
    'top': '10px',
    'fontSize': '14px'
  }, 300);
})
$('.contact-form').find('.form-control').blur(function() {
  if ($(this).val().length == 0) {
    $(this).parent('.input-block').removeClass('focus');
    $(this).parent().find('label').animate({
      'top': '25px',
      'fontSize': '18px'
    }, 300);
  }
})

// Paralax effect for the project tiles
$(window).scroll(function() {

const scrollTop = $(this).scrollTop();

	if(scrollTop > $('#Portfolio').offset().top - $(window).height())
	{
		var offsetPortfolio = Math.max(-$(window).width()/2, Math.min(0, scrollTop - $('#Portfolio').offset().top));
		console.log('offsetPortfolio: ' + offsetPortfolio);
		var offsetD3 = Math.min($(window).width()/2, Math.max(0, - scrollTop + $('#Portfolio').offset().top ));
		console.log('offsetD3: ' + offsetD3);
		$('#portfolio').css({'transform': 'translate(' + offsetPortfolio + 'px, 20px)'});
 		$('#portfolio').css({'opacity':  scrollTop / ($(window).height() * 1.25)});
		$('#D3').css({'transform': 'translate(' + offsetD3 + 'px, 20px)'});
 		$('#D3').css({'opacity': scrollTop / ($(window).height() + 1.25)});
		console.log(scrollTop);
	}
})

/* pop up */


$('#portfolio').click(function(){
	$('.pop-up').addClass('open');
	$('.projectsContainer').addClass('blur');
});

$('.pop-up .return').click(function(){
  $('.pop-up').removeClass('open');
	$('.projectsContainer').removeClass('blur');
});

$('.invisibleDiv').click(function(){
	$('.pop-up').removeClass('open');
	$('.projectsContainer').removeClass('blur');
});
