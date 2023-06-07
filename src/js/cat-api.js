export { fetchBreeds,  fetchCatByBreed};

const MY_API_KEY = 'live_SQaMb78X6e2HQyuWGiJMLYhVdCF2JW3TGjBlkUxwJK4JNYYlgKyqgOiHyaGe8Mw7';
    
const options = {
    headers: {
        'x-api-key': MY_API_KEY,
    }
};

function fetchBreeds() { // виконує HTTP-запит і повертає проміс із масивом порід
    const url = `https://api.thecatapi.com/v1/breeds`; // даю ключ до сервера  
    return fetch(url, options) // повертає запит 
    .then((response) => { // повернення промісу (перший запит на сервер)
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()   
    })
}

function fetchCatByBreed(breedId) { // робить HTTP-запит і повертає проміс із даними про кота
    const urlInfCat = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breedId}`; // даю ключ до сервера  
    return fetch(urlInfCat, options) // повертає запит 
    .then((response) => { // повернення промісу (перший запит на сервер)
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()   
    })
}