const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  nav.classList.toggle('is-open', expanded);
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) {menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open');}
});
const dialog = document.querySelector('#image-dialog');
let opener;
document.querySelectorAll('[data-enlarge]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const image = dialog.querySelector('img');
  image.src = button.dataset.enlarge;
  image.alt = button.dataset.caption;
  dialog.querySelector('#image-caption').textContent = button.dataset.caption;
  dialog.showModal();
}));
dialog?.querySelector('button').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
dialog?.addEventListener('close', () => opener?.focus());
// Progressive enhancement: every image remains visible without JavaScript.
const gallery = document.querySelector('.gallery');
if (gallery) {
  const buttons = [...document.querySelectorAll('[data-shot]')];
  const panels = [...gallery.querySelectorAll('figure')];
  const choose = index => {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    panels.forEach((panel, i) => {panel.hidden = i !== index;});
  };
  buttons.forEach((button, index) => button.addEventListener('click', () => choose(index)));
  choose(0);
  document.querySelector('.gallery-controls').hidden = false;
}
