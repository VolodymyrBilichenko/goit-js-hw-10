import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './sass/index.scss';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

let SlimSelectData = [];

const slimSelInp = new SlimSelect({
    select: '.breed-select',
    data: SlimSelectData,
});


const refs = {
    selectInp: document.querySelector('.breed-select'),
    loadingData: document.querySelector('.loader'),
    errorMes: document.querySelector('.error'),
    infoCat: document.querySelector('.cat-info'),
    selectSsMain: document.querySelector('.ss-main'),
};
refs.selectSsMain.classList.add('is-hidden');
refs.loadingData.style.display = 'none';
refs.selectInp.addEventListener('change', onChangeCat);

let isFirstLoad = true;

textLoading();
fetchBreeds()
    .then((serverInf) => {
        closeTextLoading();
        serverInfCats(serverInf); // посилання на фун-ю яка робить перебор обьєкта з сервера
    })
    .catch((error) => {
        refs.selectInp.classList.add('is-hidden');
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

        SlimSelectData.push({text: el.name, value: el.id});
    });
    slimSelInp.setData(SlimSelectData);
}


function onChangeCat() { // фун-я для вибору кота з сервера по параметрам (запуска'ється за допомогою fetchCatByBreed())
    if (isFirstLoad) { 
        isFirstLoad = false;
        return;
    }
    const breedId = this.value;
    
    resetCatCard();
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
            resetCatCard();
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
    refs.selectInp.classList.remove('hidden');
    refs.selectSsMain.classList.remove('is-hidden');
}

function errorMessage() {
    const txtErrMes = refs.errorMes.textContent;
    Notiflix.Notify.failure(`${txtErrMes}`); // виводить помилку з сервера
}

function resetCatCard() { // для очистки та відновлення карток з котами
    refs.infoCat.innerHTML = '';
}