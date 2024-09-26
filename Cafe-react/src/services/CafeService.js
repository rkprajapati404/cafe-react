import axios from 'axios';
import { BASE_URL, CAFES, EMPLOYEES } from '../constant/API';

export const getCafes = (location) => {
    if (location) {
        return axios.get(BASE_URL + CAFES, {
            params: { location: location }
        });
    }
    return axios.get(BASE_URL + CAFES);
}

export const getEmployee = (cafeId) => {
    console.log(cafeId);

    return axios.get(BASE_URL + EMPLOYEES + "/cafe/" + cafeId);
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
    console.log(id);
    return axios.delete(BASE_URL + CAFES, {
        params: { _id: id }
    });
}

export const addCafe = (cafeObject) => {
    return axios.post(BASE_URL + CAFES, cafeObject);
}

export const getCafeById = (id) => {
    return axios.get(BASE_URL + CAFES + "/" + id);
}

export const editCafe = (cafeObject) => {
    return axios.put(BASE_URL + CAFES, cafeObject);
}