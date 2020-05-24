import axios from 'axios';
import { API } from '../data/api';

export class ReviewService {

    async addReview(data) {
        return (await axios.patch(`${API.URL}review/${data.productID}`, data));
    }

    async getReviews(productID) {
        return (await axios.get(`${API.URL}review/${productID}`));
    }
}
