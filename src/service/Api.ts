import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8080/api/"
    //baseURL: "https://renaissancerentals.herokuapp.com/api/"
});