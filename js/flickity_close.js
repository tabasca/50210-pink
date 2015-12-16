var elem = document.querySelector('.slider');
var flkty
function sliderOn(){
	return flkty = new Flickity( elem, {
			// options
			cellAlign: 'left',
			contain: true,
			prevNextButtons: false,
			cellSelector: '.price',
			initialIndex: 2
	});
}

function sliderOff(){

	return flkty.destroy();
}

if (window.innerWidth < 660){
	sliderOn();
} else {
	sliderOff();
}

window.addEventListener('resize', function(){
	if (window.innerWidth < 660){
		sliderOn();
	} else {
		sliderOff();
	}
})
// sliderOff();
