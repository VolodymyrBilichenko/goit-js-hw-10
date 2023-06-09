export { fetchBreeds,  fetchCatByBreed};

const MY_API_KEY = 'live_SQaMb78X6e2HQyuWGiJMLYhVdCF2JW3TGjBlkUxwJK4JNYYlgKyqgOiHyaGe8Mw7';
const BASE_URL = 'https://api.thecatapi.com/v1/';

const options = {
    headers: {
        'x-api-key': MY_API_KEY,
    }
};

function fetchBreeds() { // виконує HTTP-запит і повертає проміс із масивом порід
    const url = `${BASE_URL}breeds`; // даю ключ до сервера  
    return fetch(url, options) // повертає запит 
    .then((response) => { // повернення промісу (перший запит на сервер)
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()   
    })
}

function fetchCatByBreed(breedId) { // робить HTTP-запит і повертає проміс із даними про кота
    const urlInfCat = `${BASE_URL}images/search?limit=1&breed_ids=${breedId}`; // даю ключ до сервера  
    return fetch(urlInfCat, options) // повертає запит 
    .then((response) => { // повернення промісу (перший запит на сервер)
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()   
    })
}