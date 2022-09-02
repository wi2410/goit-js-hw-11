
import Notiflix from 'notiflix';
import PixabayApiService from "./components/pixabay-service"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.btn__load-more');
const apiService = new PixabayApiService();
let simpleLightBox = null;


inputEl.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

btnLoadMore.classList.add('is-hiden')


function onSubmit(ev) {
    ev.preventDefault();

    clearArticlesContainer();
    apiService.query = ev.currentTarget.elements.searchQuery.value;
    apiService.resetPage();
    apiService.fetchArticles().then(articles => {
        if (articles.hits.length === 0) {
            return  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        Notiflix.Notify.success(`Hooray! We found ${articles.totalHits} images.`);
        renderMarkupCards(articles);
        btnLoadMore.classList.remove('is-hiden');
    })

    
    
}

function renderMarkupCards(obj) {
    const markup = obj.hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery__item" href="${largeImageURL}">
        <div class="photo-card">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>
        </a>`
    }).join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    simpleLightBox = new SimpleLightbox('.gallery a');
}

function onLoadMore() {
    apiService.fetchArticles().then(renderMarkupCards);
}

function clearArticlesContainer() {
    galleryContainer.innerHTML = '';  
}
