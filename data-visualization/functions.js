const logo = document.querySelectorAll("#logo path");

for( let i = 0; i < logo.length; i++)
{
	console.log(`leffer ${i} is ${logo[i].getTotalLength()}`);
}

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
