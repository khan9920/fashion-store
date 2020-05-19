import axios from 'axios';
import { API } from '../data/api';

export class CategoriesService {
    async getCategories() {
        return (await axios.get(`${API.URL}category`));
    }

    async getCategory(ID) {
        return (await axios.get(`${API.URL}category/${ID}`));
    }

    async addCategory(formData) {
        return (await axios.post(`${API.URL}category`, formData));
    }

    async updateCategory(formData, ID) {
        return (await axios.patch(`${API.URL}category/${ID}`, formData));
    }

    async deleteCategory(ID) {
        return (await axios.delete(`${API.URL}category/${ID}`));
    }
}
