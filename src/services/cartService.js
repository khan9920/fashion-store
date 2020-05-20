import axios from 'axios';
import { API } from '../data/api';

export class CartService {
    async getCart(ID) {
        return (await axios.get(`${API.URL}carts/${ID}`));
    }

    async addToCart(formData, ID) {
        return (await axios.patch(`${API.URL}carts/${ID}`, formData));
    }

    async updateCart(productID, userID) {
        console.log(productID, userID);
        return (await axios.patch(`${API.URL}carts/${productID}/${userID}`));
    }
}
