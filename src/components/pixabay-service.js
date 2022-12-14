import axios from "axios";
import Notiflix from 'notiflix';
const KEY = '29656513-372141d59901600f23fa64349';
const URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
    };

    async fetchArticles() {
        const params = {
            key: KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.perPage,
            page: this.page,
        }
        try {
            const response = await axios.get(URL, { params });
            this.page += 1;
            
            return response.data;
        } catch (error) {
            Notiflix.Notify.failure(`Sorry, there are some problem: ${error.response} Please try again.`);
            console.error(error.response);
        
        }     
    }

    // fetchArticles() {
    //     const response = fetch(`https://pixabay.com/api/?key=29656513-372141d59901600f23fa64349&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
    //     return response.data;
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