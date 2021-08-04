import { Notify, Report, Confirm, Loading, Block } from "notiflix";
import axios from 'axios';

const API_KEY = '22770048-68f29ae7be79c027fc88359a9';
const BASE_URL = 'https://pixabay.com/api/';

const TYPE_CONTENT = 'photo';

let queryParams = '';

// axios.defaults.headers.common.Authorization = API_KEY;

axios.defaults.baseURL = BASE_URL;

const galleryList = document.querySelector('.gallery-list');

let queryString = '';

let page = 1;

export default async function getFetch(query= null) {
  if(query !== null) {
    page = 1;
    galleryList.innerHTML = '';
    queryString = query;
  }

  queryParams = `?key=${API_KEY}&q=${queryString}&image_type=${TYPE_CONTENT}&orientation=horizontal&safesearch=true&page=${page}`;
  try {
    const response = await axios.get( `${queryParams}`)
    const data = await response.data;

    if (data.total === 0) {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }

    const array = data.hits;
    const elementList = array.map((item)=> {
      return `
      <li class="photo-card">
      <div class='photo-card__thumb'>
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width='300'/>
      </div>
        <div class="info">
          <p class="info-item">
          Likes:
            <b>${item.likes}</b>
          </p>
          <p class="info-item">
          Views:
            <b>${item.views}</b>
          </p>
          <p class="info-item">
          Comments:
            <b>${item.comments}</b>
          </p>
          <p class="info-item">
          Downloads:
            <b>${item.downloads}</b>
          </p>
        </div>
      </li>
    `;
    })
    galleryList.insertAdjacentHTML('beforeend', elementList.join(''));
    page ++;
  } catch ( error ) {
    console.log( error );
    return Notify.failure("Oops, there is no country with that name");
  }
}