import axios from "axios";
import Notiflix from 'notiflix';
const API_KEY = '29656513-372141d59901600f23fa64349';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.picsPerPage = 40;
    }

    async fetchArticles() {
        const options = {
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.picsPerPage,
            page: this.page,
        }
        try {
            const response = await axios.get(BASE_URL, { options });
            this.page += 1;
            console.log(response)
            return response.data;
        } catch (error) {
            Notiflix.Notify.failure(`Sorry, there are some problem: ${error.response} Please try again.`);
            console.error(error.response);
        
        }
    }
    resetPage() {
    this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}