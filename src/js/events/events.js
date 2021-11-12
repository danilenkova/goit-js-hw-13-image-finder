import PhotoApiService from '../servise/apiService';
import { galleryCreate, clearPage } from '../servise/buildingPage';
import { onOpenModal, onCloseModal, onBackDropClick, onKeyPress } from '../events/modal.js';
import { scrollTo, scrollTop } from '../vendors/scrolltotop';
import { NOT_ALERTS, myAlert, showError } from '../vendors/alert.js';

export default class Events extends PhotoApiService {
  constructor({ refs }) {
    super();
    this.refs = refs;
  }

  loadEventListener = () => {
    this.refs.searchForm.addEventListener('keydown', this.turnOnBtn);
    this.refs.searchForm.addEventListener('submit', this.onSearch);
    this.refs.loadMoreBtn.addEventListener('click', this.onLoadMore);

    this.refs.galleryList.addEventListener('click', onOpenModal);
    this.refs.closeModalBtn.addEventListener('click', onCloseModal);
    this.refs.backdrop.addEventListener('click', onBackDropClick);

    document.addEventListener('DOMContentLoaded', scrollTop);
  };
  turnOnBtn = e => {
    this.refs.submitBtn.removeAttribute('disabled');
  };
  onSearch = e => {
    e.preventDefault();
    this.searchQuery = this.refs.searchForm.elements.query.value;
    if (!this.searchQuery.trim()) {
      return myAlert(NOT_ALERTS.EMPTY);
    }
    if (!this.searchQuery.match(/^[a-zA-Z,() ']*$/)) {
      return showError(NOT_ALERTS.NO_VALID);
    }
    this.refs.submitBtn.setAttribute('disabled', true);
    this.resetPage();
    scrollTo(0, 400);
    this.fetchPhotos().then(({ total, hits }) => {
      clearPage();
      if (total === 0) {
        showError(NOT_ALERTS.NOT_FOUND);
      } else {
        galleryCreate(hits);
        this.countTotalImages();
      }
      this.checkLoadMore();
      if (total > this.totalImages) {
        this.refs.loadMoreBtn.classList.remove('visually-hidden');
      } else if (total < this.per_page) {
        return;
      }
    });
  };

  onLoadMore = () => {
    this.incrementPage();
    this.fetchPhotos().then(({ hits }) => galleryCreate(hits));
    this.countTotalImages();
  };

  checkLoadMore = () => {
    if (!this.refs.loadMoreBtn.classList.contains('visually-hidden')) {
      this.refs.loadMoreBtn.classList.add('visually-hidden');
    }
  };
  start = () => {
    this.loadEventListener();
  };
}
