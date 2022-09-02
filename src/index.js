
import Notiflix from 'notiflix';
import PixabayApiService from "./components/pixabay-service"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const toBtnTop = document.querySelector('.btn-to-top');
const loading = document.querySelector('.pulse-container');

window.addEventListener('scroll', InfiniteScrolling);
window.addEventListener('scroll', onScroll);
toBtnTop.addEventListener('click', onToTopBtn);

const apiService = new PixabayApiService();
let simpleLightBox = null;
let totalPics = 0;


inputEl.addEventListener('submit', onSubmit);


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
        totalPics = articles.total;
        renderMarkupCards(articles);
        // btnLoadMore.classList.remove('is-hiden');
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
}

function clearArticlesContainer() {
    galleryContainer.innerHTML = '';  
}

function InfiniteScrolling() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
		// show the loading animation
        showLoading(); 
	}
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(loadMore, 1500);
}

function loadMore() {
if (apiService.page > Math.ceil(totalPics / apiService.picsPerPage)) {
  return;
  }  
  apiService.fetchArticles()
    .then(articles => {
      renderMarkupCards(articles);
      if (apiService.page > Math.ceil(totalPics / apiService.picsPerPage)) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
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


// const btnLoadMore = document.querySelector('.btn__load-more');

// btnLoadMore.classList.add('is-hiden')

// btnLoadMore.addEventListener('click', onLoadMore);

// function onLoadMore() {
//     apiService.fetchArticles().then(renderMarkupCards);
// }