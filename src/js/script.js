const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.mobile-menu__nav-link');
let bool = false;

function closeNav() {
  menuBtn.classList.remove('active');
  nav.classList.remove('active');
}

function openNav() {
  menuBtn.classList.add('active');
  nav.classList.add('active');
}

menuBtn.addEventListener('click', () => {
  if (!bool) {
    openNav();
    bool = !bool;
  } else {
    closeNav();
    bool = !bool;
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (bool) {
      closeNav();
      bool = !bool;
    }
  });
});
