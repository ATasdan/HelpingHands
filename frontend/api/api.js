const axios = require("axios");

export const api = axios.create({
  baseURL: "https://helpinghandsproject.herokuapp.com/api",
});

export function changeToken(token){
    api.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}
