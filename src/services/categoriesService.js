import axios from 'axios';
import { API } from '../data/api';

export class CategoriesService {
    async getCategory() {
        return (await axios.get(`${API.URL}category`));
    }

    async addCategory(formData) {
        return (await axios.post(`${API.URL}category`, formData));
    }
}
