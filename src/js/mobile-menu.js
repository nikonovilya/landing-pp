const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.mobile-menu');
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
