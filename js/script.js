var hamburgerMenu = document.querySelector('#hamburgerMenu');
var hamburgerButton = document.querySelector('#hamburgerButton');
var menuItems = document.querySelectorAll('.nav__link');

function openHamburgerMenu(e) {  
  hamburgerMenu.classList.add('active');
  hamburgerButton.classList.add('is-active');
}

function closeHamburgerMenu(e) {  
  hamburgerMenu.classList.remove('active');
  hamburgerButton.classList.remove('is-active');
}

hamburgerButton.addEventListener('click', function (e) {
  e.preventDefault();
  if(hamburgerButton.classList.contains('is-active')) {
    hamburgerMenu.classList.add('fadeOut');
    setTimeout(() => {
      closeHamburgerMenu();
      hamburgerMenu.classList.remove('fadeOut');
    }, 400);
    
  } else {
    openHamburgerMenu();
  }
});


hamburgerMenu.addEventListener('click', function (e) {
  e.preventDefault;
  console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    closeHamburgerMenu();
  }
})