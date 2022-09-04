
import Notiflix from 'notiflix';
import PixabayApiService from "./components/pixabay-service"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const toBtnTop = document.querySelector('.btn-to-top');
const loading = document.querySelector('.pulse-container');

window.addEventListener('scroll', onScroll);
toBtnTop.addEventListener('click', onToTopBtn);

const pixabayApiService = new PixabayApiService();
let simpleLightBox = null;
let totalPics = 0;
let observer = new IntersectionObserver(entries => {
    if (entries[0].intersectionRatio <= 0) {
        return;
    }
    showLoading();
})

inputEl.addEventListener('submit', onSubmit);


function onSubmit(ev) {
    ev.preventDefault();
    const inputValue = ev.currentTarget.elements.searchQuery.value;

    if (inputValue === '') {
        return Notiflix.Notify.failure('Input field is EMPTY! Please enter your request!');
    }

    observer.unobserve(loading);
    clearArticlesContainer();
    pixabayApiService.resetPage();
    pixabayApiService.query = inputValue;
    

    pixabayApiService.fetchArticles().then(articles => {
        if (articles.hits.length === 0) {
            return  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        Notiflix.Notify.success(`Hooray! We found ${articles.totalHits} images.`);
        totalPics = articles.totalHits;
        renderMarkupCards(articles);
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
    loading.classList.remove('show');
    observer.observe(loading);
}

function clearArticlesContainer() {
    galleryContainer.innerHTML = '';  
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(loadMore, 1500);
}

function loadMore() {
    if (pixabayApiService.page > Math.ceil(totalPics / pixabayApiService.perPage)) {
        loading.classList.remove('show');
        return;
  }  
 
  pixabayApiService.fetchArticles()
    .then(articles => {
        renderMarkupCards(articles);
        
        const totalPages = Math.ceil(articles.totalHits / pixabayApiService.perPage)
            if (pixabayApiService.page > totalPages) {
                    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                }
      smoothScroll();
    })
  
};

function onScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    toBtnTop.classList.add('btn-to-top--visible')
  }
  if (scrolled < coords) {
    toBtnTop.classList.remove('btn-to-top--visible')
  }
}

function onToTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}