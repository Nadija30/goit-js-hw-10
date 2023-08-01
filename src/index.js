import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';



const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

//selector.addEventListener('change', onSelectBreedCat);


//fetchBreeds().then(console.log) 
let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
    selector.addEventListener('change', onSelectBreedCat);
}).catch(onFetchError);
//console.log(arrBreedsId)

function onSelectBreedCat(evt) {
    evt.preventDefault();
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');
    //console.log(evt.currentTarget.value)
    const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId)
    
        .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        const catInfo = `<div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="300"/>
        </div>
        <div class="box">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}
        </p>
        </div>`
        divCatInfo.innerHTML = catInfo;
        divCatInfo.classList.remove('is-hidden');
        
    })
    .catch(onFetchError);
};


function onFetchError(error) {
 selector.classList.remove('is-hidden');
loader.classList.replace('loader', 'is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 3000,
        width: '500px',
    });
};
   