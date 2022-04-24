const axios = require('axios');

export const api = axios.create({
    baseURL: "https://helpinghandsproject.herokuapp.com/api"
})