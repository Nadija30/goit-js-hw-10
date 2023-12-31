import axios from "axios";
axios.defaults.baseURL ='https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = "live_n1s7YtWElldkVXS9keSKQYZWhS34TNr45yJqh0E7gf9C9Nv0bvhGcHmFsOwjx9F3";

export function fetchBreeds() {
    return axios.get(`/breeds`)
   .then(response => {
            return response.data;
        });      
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`)
   .then(response => {
            return response.data;
        });      
}


