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
  let index;
  const collection = document.querySelectorAll('.photo');
  const currentOpenImage = document.querySelector('.lightbox__image');
  const currentSrc = currentOpenImage.src;
  if (e.code === 'Escape') {
    onCloseModal();
  }
  console.log(e.code);
  if (e.code === 'ArrowRight') {
    index = 0;
    for (let i = 0; i <= collection.length - 1; i++) {
      if (collection[i].dataset.source === currentSrc) {
        index = i;
        if (index >= collection.length - 1) {
          index = 0;
          currentOpenImage.src = collection[index].dataset.source;
          currentOpenImage.alt = collection[index].alt;
        } else {
          currentOpenImage.src = collection[index + 1].dataset.source;
          currentOpenImage.alt = collection[index + 1].alt;
        }
      }
    }
  }
  if (e.code === 'ArrowLeft') {
    index = 0;
    for (let i = 0; i <= collection.length - 1; i++) {
      if (collection[i].dataset.source === currentSrc) {
        index = i;
        if (index < 1) {
          index = collection.length - 1;
          currentOpenImage.src = collection[index].dataset.source;
          currentOpenImage.alt = collection[index].alt;
          console.log(index);
        } else {
          currentOpenImage.src = collection[index - 1].dataset.source;
          currentOpenImage.alt = collection[index - 1].alt;
        }
      }
    }
  }
}

export { onOpenModal, onCloseModal, onBackDropClick };
