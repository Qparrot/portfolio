var fr = document.getElementById('fr');
var en = document.getElementById('en');
var al = document.getElementById('al');
var about = document.getElementById('about');
var projects = document.getElementById('projects');
var contact = document.getElementById('contact');
var title = document.getElementById('title');
var shortDescription = document.getElementById('shortDescription');


function reload()
{
	setTimeout(function()
	{
		location.reload();
	}, 100);
}

var language = {
	eng: {
		about: "About",
		projects: "Projects",
		contact: "Contact",
		title: "FRONT END DEVELOPER",	
		shortDescription: "building websites that achieve entrepreneurs' goals"
	},
	de: {
		about: "Über mich",
		projects: "Projekte",
		contact: "Kontakt",
		title: "FRONT END ENTWICKLER",	
		shortDescription: "Erstellung von Websites, die die Ziele der Unternehmer erreichen!"
	},
	fr: {
		about: "Qui suis-je?",
		projects: "Projets",
		contact: "Contact",
		title: "FRONT END DEVELOPPEUR",	
		shortDescription: "Création de sites web qui atteignent les objectifs des entrepreneurs !"
	}
};
if(window.location.hash)
{
	if(window.location.hash === "#eng") 
	{
		about.textContent = language.eng.about;
		projects.textContent = language.eng.projects;
		contact.textContent = language.eng.contact;
		title.textContent = language.eng.title;
		shortDescription.textContent = language.eng.shortDescription;
	}
	if(window.location.hash === "#de")
	{
		about.textContent = language.de.about;
		projects.textContent = language.de.projects;
		contact.textContent = language.de.contact;
		title.textContent = language.de.title;
		shortDescription.textContent = language.de.shortDescription;
	}
	if(window.location.hash === "#fr")
	{
		about.textContent = language.fr.about;
		projects.textContent = language.fr.projects;
		contact.textContent = language.fr.contact;
		title.textContent = language.fr.title;
		shortDescription.textContent = language.fr.shortDescription;
	}
}
// define language reload onclick iteration

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
// Responsive nav

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

$('.nav-link').on('click', function(event)
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

