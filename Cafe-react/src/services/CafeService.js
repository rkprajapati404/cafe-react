import axios from 'axios';
import { BASE_URL, CAFES } from '../constant/API';
export const getCafes = () => {
    return axios.get(BASE_URL + CAFES);
}