import { NOT_ALERTS, showError } from '../vendors/alert';
export default class PhotoApiService {
  constructor(data) {
    this.BASE_URL = 'https://pixabay.com/api';
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
    this.type = 'photo';
    this.totalImages = '';
    this.API_KEY = '24282409-c51302311d18786c8ef637bd6';
    this.result = null;
  }

  fetchPhotos = async () => {
    const url = `${this.BASE_URL}/?key=${this.API_KEY}&q=${this.searchQuery}&per_page=${this.per_page}&page=${this.page}&type=${this.type}$total=15`;
    try {
      const response = await fetch(url);
      this.result = response.json();
      return this.result;
    } catch (error) {
      console.log(error);
      if (totalHits === 0) {
        showError(NOT_ALERTS.NOT_FOUND);
      }
    }
  };
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  countTotalImages() {
    this.totalImages = this.page * this.per_page;
  }
}
