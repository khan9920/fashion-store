import axios from 'axios';
import { API } from '../data/api';

export class WishlistService {
    async getWishList(ID) {
        return (await axios.get(`${API.URL}wishlist/${ID}`));
    }

    async addToWishList(formData, ID) {
        return (await axios.patch(`${API.URL}wishlist/${ID}`, formData));
    }

    async updateWishList(productID, userID) {
        return (await axios.patch(`${API.URL}wishlist/${productID}/${userID}`));
    }
}
