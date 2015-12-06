var parent = document.querySelector(".page-header");
var toggle = document.querySelector(".page-header__btn-menu");

parent.classList.add('js-menu');

toggle.addEventListener("click", function(event) {
event.preventDefault();
parent.classList.toggle('js-menu--open');
});


console.log(toggle);
