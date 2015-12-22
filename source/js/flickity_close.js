var elem = document.querySelector('.slider-table');
var elemHidden = document.querySelector('.price--hidden');
var flkty;
if (window.innerWidth < 660){
	flkty = new Flickity( elem, {
			// options
			cellAlign: 'left',
			contain: true,
			prevNextButtons: false,
			cellSelector: '.price',
			initialIndex: 2
	});
}

flkty.remove(elemHidden);
