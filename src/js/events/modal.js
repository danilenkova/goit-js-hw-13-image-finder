import getRefs from '../data/references';

const refs = getRefs();

// Modal events
function onOpenModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const currentImage = e.target;
  window.addEventListener('keydown', onKeyPress);
  refs.lightbox.classList.add('is-open');
  if (refs.toTopBtn.classList.contains('show')) {
    refs.toTopBtn.classList.remove('show');
  }
  setImageOptins(currentImage);
}

function setImageOptins(smallImage) {
  refs.originalImage.src = smallImage.getAttribute('data-source');
  refs.originalImage.alt = smallImage.alt;
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onKeyPress);
  refs.lightbox.classList.remove('is-open');
  if (pageYOffset > 100) {
    refs.toTopBtn.classList.add('show');
  }
  refs.originalImage.removeAttribute('src');
  refs.originalImage.removeAttribute('alt');
}

function onBackDropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

export { onOpenModal, onCloseModal, onBackDropClick, onKeyPress };
