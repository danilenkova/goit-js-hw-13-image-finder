import imagesListTpl from '../../templates/images-list.hbs';
import getRefs from '../data/references';

const refs = getRefs();

function galleryCreate(images) {
  refs.galleryList.insertAdjacentHTML('beforeend', imagesListTpl(images));
}

function clearPage() {
  refs.galleryList.innerHTML = '';
}

export { galleryCreate, clearPage };
