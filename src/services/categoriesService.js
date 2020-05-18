import axios from 'axios';
import { API } from '../data/api';

export class CategoriesService {
    async getCategory() {
        return (await axios.get(`${API.URL}category`));
    }
}
