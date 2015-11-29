var wallopEl = document.querySelector('.Wallop');
var wallop = new Wallop(wallopEl);

var paginationDots = Array.prototype.slice.call(document.querySelectorAll('.pagination__item'));

/*
Attach click listener on the dots
*/
paginationDots.forEach(function(dotEl, index) {
  dotEl.addEventListener('click', function() {
    price.goTo(index);
  });
});

/*
Listen to wallop change and update classes
*/
price.on('change', function(event) {
  removeClass(document.querySelector('.pagination__item--active'), 'pagination__item--active');
  addClass(paginationDots[event.detail.currentItemIndex], 'pagination__item--active');
});



// Helpers
function addClass(element, className) {
  if (!element) {
    return;
  }
  element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
}

function removeClass(element, className) {
  if (!element) {
    return;
  }
  element.className = element.className.replace(className, '');
}
