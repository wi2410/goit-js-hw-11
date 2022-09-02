import axios from "axios";
import Notiflix from 'notiflix';
const API_KEY = '29656513-372141d59901600f23fa64349';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.picsPerPage = 40;
    };

    async fetchArticles() {
        const params = {
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.picsPerPage,
            page: this.page,
        }
        try {
            const response = await axios.get(BASE_URL, { params });
            this.page += 1;
            
            return response.data;
        } catch (error) {
            Notiflix.Notify.failure(`Sorry, there are some problem: ${error.response} Please try again.`);
            console.error(error.response);
        
        }
         
         
    }

    // fetchArticles() {
    //     fetch(`https://pixabay.com/api/?key=29656513-372141d59901600f23fa64349&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
    // }

    resetPage() {
    this.page = 1;
    }

    // get query() {
    //     return this.searchQuery;
    // }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}