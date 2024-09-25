import axios from 'axios';
import { BASE_URL, CAFES, EMPLOYEES } from '../constant/API';

export const getCafes = () => {
    return axios.get(BASE_URL + CAFES);
}

export const getEmployee = () => {
    return axios.get(BASE_URL + EMPLOYEES);
}

export const getEmployeeById = (id) => {
    return axios.get(BASE_URL + EMPLOYEES + "/" + id);
}

export const addEmployee = (empObject) => {
    return axios.post(BASE_URL + EMPLOYEES, empObject);
}

export const editEmployee = (empObject) => {
    return axios.put(BASE_URL + EMPLOYEES, empObject);
}

export const deleteEmployee = (employeeId) => {
    return axios.delete(BASE_URL + EMPLOYEES, {
        params: { _id: employeeId }
    });
}

export const deleteCafe = (id) => {
    return axios.delete(BASE_URL + CAFES, {
        params: { _id: id }
    });
}