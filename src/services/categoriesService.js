import axios from 'axios';
import { API } from '../data/api';

export class CategoriesService {
    async getCategory() {
        return (await axios.get(`${API.URL}category`));
    }

    async addCategory(formData) {
        return
    }

    async deleteCategory(ID) {
        return (await axios.delete(`${API.URL}category/${ID}`));
    }
}
