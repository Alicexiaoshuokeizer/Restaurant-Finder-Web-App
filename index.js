import { apiWrapper } from "./simpleAPI.js";

async function search() {
    //1. get text input when key enter pressdown
    const input = document.getElementById('input');
    const postcode = input.value 

    //2. call api and wrapper to get arr: first 10 restaurants or str: invalid postcode
    const results = await apiWrapper(postcode);

    //3. show search results in div id = results
    //3.1 clear old results
    const resulDiv = document.getElementById('results');
    resulDiv.innerHTML = ''; 

    //3.2 if results === invalid postcode, show 'invalide postcode / no results'
    if (results === 'invalid postcode') {
        const noResult = document.createElement('h3');
        noResult.textContent = 'No results, please check your postcode';
        resulDiv.appendChild(noResult);
    }

    //3.3 if results are restaurants array, show restaurants in containers
    if (Array.isArray(results)) {
       for (let r of results) {
        const container = document.createElement('div')
        container.class = 'item';

        const name = document.createElement('h4');
        name.textContent = r.name;

        const rating = document.createElement('p');
        rating.innerHTML = `<span>star rating</span>: ${r.rating}`;

        const cuisines = document.createElement('p');
        cuisines.innerHTML = `<span>cuisines</span>: ${r.cuisines.join()}`;

        const address = document.createElement('p');
        address.innerHTML = `<span>address</span>: ${r.address}`
        container.append(name, 
                        rating, 
                        cuisines, 
                        address);
        resulDiv.appendChild(container);
       } 
    }
}

function handler(event) {
    // form method prevent submit jump to a new page
    event.preventDefault();
    search();
}  

const form = document.getElementById('search-form');
form.addEventListener('submit', handler);









