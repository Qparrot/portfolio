/* ====================================
 * NAV BAR:
 * ================================= */

 $('#Showcase').css({'height': window.innerHeight});

$(function() {
	menu = $('nav .cf');
	resume = $('#RESUME');

	$('#openup').on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
		if(resume.css('visibility') === 'hidden')
		{
			resume.css({'opacity': '1'});
			resume.css({'visibility': 'visible'});
		}
		else
		{
			resume.css({'opacity': '0'});
			resume.css({'visibility': 'hidden'});
		}

	});

	$(window).resize(function(){
		var w = $(this).width();

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
			$('#RESUME').css({'opacity': '1'});
			$('#RESUME').css({'visibility': 'visible'});
		});
	$('.open-menu').height($(window).height());
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

/* ====================================
 * SMOOTH MOVE:
 * ================================= */

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

/* ====================================
 * PORTFOLIO parallax effect:
 * ================================= */

let blockTheScroll; 

$(window).scroll(function() {

	if(window.innerWidth <= 500)
	{
		blockTheScroll = 1;
	}
	console.log('BlockScroll:' + blockTheScroll);
	if (!blockTheScroll)
	{
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
			if(offsetPortfolio === 0)
			{
				blockTheScroll = 1;
			}
		}
	}
	else
	{
		$('#portfolio').css({'opacity' : '1'});
		$('#portfolio').css({'transform' : 'none'});
		$('#D3').css({'transform' : 'none'});
	}
})

/* ====================================
 * POP-UP:
 *
 * When the #portfolio tile is clicked
 * the pop-up is shown and the body is
 * unscrollable and blured. When we 
 * close the pop-up, the blur and un-
 * scrollability are stopped.
 * ================================= */

$( document ).ready(function() {
    $('.activate-pop-up').height($('#portfolio img').height());
    $('.activate-pop-up').width($('#portfolio img').width());
});

$('.activate-pop-up').click(function(){
		$('.pop-up').addClass('open');
		$('.pop-up').removeClass('notOpen');
		$('.wrap').addClass('blur');
		$('body').css('overflow', 'hidden').on('touchmove', function(e) {
			e.preventDefault();
		});
});

$('.pop-up .return').click(function(){
	$('.pop-up').removeClass('open');
	$('.pop-up').addClass('notOpen');
	$('.wrap').removeClass('blur');
	$('body').css('overflow', 'auto').off('touchmove');
});

$('.invisibleDiv').click(function(){
	$('.pop-up').removeClass('open');
	$('.pop-up').addClass('notOpen');
	$('.wrap').removeClass('blur');
	$('body').css('overflow', 'auto').off('touchmove');
});

/* ====================================
 * CONTACT FORM:
 * ================================= */

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
