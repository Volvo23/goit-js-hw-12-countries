import './styles.css';
import fetchCountries from './fetchCountries';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import singleCountrie from './templates/singleCountrie.hbs';
import contriesList from './templates/countriesList.hbs';

const debounce = require('lodash.debounce');

const list = document.querySelector('.list');
const input = document.querySelector('.input');

function findCountries(event) {
  const inputValue = event.target.value;
  if (inputValue) {
    fetchCountries(inputValue).then(data => {
      if (data.length === 1) {
        list.innerHTML = singleCountrie(data[0]);
        return;
      } else if (data.length > 1 && data.length < 11) {
        list.innerHTML = contriesList(data);
        return;
      } else if (data.length >= 11) {
        error({
          text: 'Too many matches found, enter more specific query',
          delay: 500,
        });
      }
    });
  }
  list.innerHTML = '';
}

input.addEventListener('input', debounce(findCountries, 500));