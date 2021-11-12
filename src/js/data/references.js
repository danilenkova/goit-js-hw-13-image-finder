export default () => {
  return {
    searchForm: document.querySelector('.search-form'),
    submitBtn: document.querySelector('.btn-submit'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    galleryList: document.querySelector('.gallery'),
    galleryImages: document.querySelectorAll('.photo'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    lightbox: document.querySelector('.lightbox'),
    backdrop: document.querySelector('.lightbox__overlay'),
    originalImage: document.querySelector('.lightbox__image'),
    toTopBtn: document.querySelector('#toTop'),
  };
};
