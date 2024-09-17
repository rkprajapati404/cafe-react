import axios from 'axios';
import { BASE_URL, CAFES, EMPLOYEES } from '../constant/API';

export const getCafes = () => {
    return axios.get(BASE_URL + CAFES);
}

export const getEmployee = () => {
    return axios.get(BASE_URL + EMPLOYEES);
}