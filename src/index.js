import './sass/main.scss';
import getFetch from './js/fetchApi';
import { Notify, Report, Confirm, Loading, Block } from "notiflix";

const enterNameCountry = document.getElementById('search-form');
const loadMore = document.querySelector('.load-more');

function startLoadMore () {
  loadMore.style.display = 'block';
}

enterNameCountry.addEventListener('submit', (e) => {
  e.preventDefault();
  let checkQuery = e.target.elements.searchQuery.value.trim();
  if (checkQuery === '') {
    return Notify.info('Enter some word');
  }
  getFetch(checkQuery);
  setTimeout(startLoadMore, 1500);

})

loadMore.addEventListener('click', ()=>{
  getFetch();
});