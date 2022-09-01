import axios from "axios";
import Notiflix from 'notiflix';
import PixabayApiService from "./components/pixabay-service"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('.search-form')
const galleryContainer = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.btn__load-more');
const pixabayApiService = new PixabayApiService();

inputEl.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

console.log(inputEl)

function onSubmit(ev) {
    ev.preventDefault();
    clearArticlesContainer();
    pixabayApiService.query = ev.currentTarget.elements.searchQuery.value;
    pixabayApiService.resetPage();
    pixabayApiService.fetchArticles().then(articles => {
        console.log(articles)
    });

    
}


// function renderMarkupCards(obj) {
//     const markup = obj.map(card => {
//         return `<a class="gallery__item" href="${largeImageURL}">
//         <div class="photo-card">
//             <img class="gallery__image" src="${}" alt="${}" loading="lazy" />
//             <div class="info">
//                 <p class="info-item">
//                     <b>Likes</b>${}
//                 </p>
//                 <p class="info-item">
//                     <b>Views</b>${}
//                 </p>
//                 <p class="info-item">
//                     <b>Comments</b>${}
//                 </p>
//                 <p class="info-item">
//                     <b>Downloads</b>${}
//                 </p>
//             </div>
//         </div>`
//     }).join('');
//     galleryContainer.insertAdjacentHTML('beforeend', markup);
//     // simpleLightBox = new SimpleLightbox('.gallery a');
// }

function onLoadMore() {
    pixabayApiService.fetchArticles().then(renderMarkupCards);
}

let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
gallery.on('show.simplelightbox');

function clearArticlesContainer() {
    galleryContainer.innerHTML = '';  
}