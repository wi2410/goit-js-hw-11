import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('.search-form')
const galleryContainer = document.querySelector('.gallery');

inputEl.addEventListener('submit', onSubmit);

function onSubmit(ev) {
    ev.preventDefault();
    



    renderMarkupCards(obj);
}


function renderMarkupCards(obj) {
    const markup = obj.map(card => {
        return `<a class="gallery__item" href="${largeImageURL}">
        <div class="photo-card">
            <img class="gallery__image" src="${}" alt="${}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${}
                </p>
                <p class="info-item">
                    <b>Views</b>${}
                </p>
                <p class="info-item">
                    <b>Comments</b>${}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${}
                </p>
            </div>
        </div>`
    }).join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    // simpleLightBox = new SimpleLightbox('.gallery a');
}

let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
gallery.on('show.simplelightbox');