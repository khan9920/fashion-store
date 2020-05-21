import axios from 'axios';
import { API } from '../data/api';

export class ProductsService {
    async getProducts() {
        return (await axios.get(`${API.URL}products`));
    }

    async getProductsFiltered(category) {
        return (await axios.get(`${API.URL}products/${category}`));
    }

    async getProduct(ID) {
        return (await axios.get(`${API.URL}products/${ID}`));
    }

    async addProduct(formData) {
        return (await axios.post(`${API.URL}products`, formData));
    }

    async updateProduct(formData, ID) {
        return (await axios.patch(`${API.URL}products/${ID}`, formData));
    }

    async deleteProduct(ID) {
        return (await axios.delete(`${API.URL}products/${ID}`));
    }
}
