import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './sass/index.scss';
import Notiflix from 'notiflix';

const refs = {
    selectInp: document.querySelector('.breed-select'),
    loadingData: document.querySelector('.loader'),
    errorMes: document.querySelector('.error'),
    infoCat: document.querySelector('.cat-info'),
};
refs.loadingData.style.display = 'none';
refs.errorMes.style.display = 'none';
refs.selectInp.addEventListener('change', onChangeCat)

textLoading();
fetchBreeds()
    .then((serverInf) => {
        closeTextLoading();
        serverInfCats(serverInf); // посилання на фун-ю яка робить перебор обьєкта з сервера
    })
    .catch((error) => {
        closeTextLoading();
        errorMessage(); // виводить помилку з сервера
        console.error('error fetching breeds: ', error);
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
    
    textLoading();
    fetchCatByBreed(breedId)
        .then((servOneCat) => {
            closeTextLoading();
            const catContent = cardForCat(servOneCat); // виводить весь обьєкт інформації з сервера
            refs.infoCat.innerHTML = catContent; // закидую контент картки в контейнер для користувача
        })
        .catch((error) => {
            closeTextLoading();
            errorMessage();
            console.error('error fetching breeds: ', error);
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

function textLoading() {
    refs.loadingData.style.display = 'block';
}

function closeTextLoading() {
    refs.loadingData.style.display = 'none';
}

function errorMessage() {
    const txtErrMes = refs.errorMes.textContent;
    Notiflix.Notify.failure(`${txtErrMes}`); // виводить помилку з сервера
}