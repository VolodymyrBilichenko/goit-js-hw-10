import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './sass/index.scss';

const refs = {
    selectInp: document.querySelector('.breed-select'),
    loadingData: document.querySelector('.loader'),
    errorMes: document.querySelector('.error'),
    infoCat: document.querySelector('.cat-info'),
};
refs.selectInp.addEventListener('change', onChangeCat)

fetchBreeds()
    .then(serverInf => {
        serverInfCats(serverInf); // посилання на фун-ю яка робить перебор обьєкта з сервера
        console.log(serverInf); // виводить весь обьєкт информації з сервера
    })
    .catch(error => {
        console.log(error); // логуємо помилку вот сервера 
        throw error; // throw !!! читати
    })

function serverInfCats(serverInf) { // фун-я для перебору об'єкта і виділення по значенням  
    serverInf.forEach((el) => {
        const servCats = document.createElement('option'); // змінна для зберігання значень перебраного об'єкта

        servCats.value = el.id;
        servCats.textContent = el.name;
        refs.selectInp.append(servCats);
    });
}

function onChangeCat() { // фун-я для вибору кота з сервера по параметрам (запуска'ється за допомогою fetchCatByBreed())
    const breedId = this.value;
    
    fetchCatByBreed(breedId)
        .then((servOneCat) => {
            const catContent = cardForCat(servOneCat); // виводить весь обьєкт інформації з сервера
            refs.infoCat.innerHTML = catContent; // закидую контент картки в контейнер для користувача
        })
        .catch(error => {
            console.log(error); // логуємо помилку вот сервера 
            throw error; // throw !!! почитать
        })
}

function cardForCat(servOneCat) {
    return servOneCat.map(({url, breeds: [{name, temperament, description}]}) => {
        return `
        <div id="container">	
            <div class="product-details">
                <h1>${name}</h1>
                <p class="information">${temperament}</p>
                <p class="information">${description}</p>
            </div>
            
            <div class="product-image">
                <img src="${url}" alt="cat photo">
            </div>
        </div>`
    }).join('');
}




