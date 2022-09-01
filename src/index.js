import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('.search-form')
const galleryContainer = document.querySelector('.gallery');

inputEl.addEventListener('submit', onSubmit);

function onSubmit(ev) {
    ev.preventDefault();
    
}