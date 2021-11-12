import { info, error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import getRefs from '../data/references';

const refs = getRefs();

const NOT_ALERTS = {
  EMPTY: 'Enter your search phrase',
  NO_VALID: 'Use Latin letters in your request!',
  NOT_FOUND: 'No images found',
  FETCH_ERROR: 'Database access error',
};

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 50,
  firstpos2: 50,
  push: 'top',
  maxOpen: 1,
  maxStrategy: 'close',
  context: document.body,
});

const myAlert = message =>
  info({
    text: message,
    delay: 1000,
    stack: myStack,
    maxTextHeight: null,
    shadow: true,
  });

const myError = message =>
  error({
    text: message,
    delay: 1000,
    stack: myStack,
    maxTextHeight: null,
    shadow: true,
  });

const showError = error => {
  refs.galleryList.innerHTML = '';
  myError(error);
};

export { NOT_ALERTS, myAlert, showError };
