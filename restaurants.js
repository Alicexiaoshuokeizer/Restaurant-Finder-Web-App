let postcode = 'EC4M7RF'; 
const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);
const data = await response.json();
const restaurantsArr = data.restaurants;
console.log(Array.isArray(restaurantsObject));
// const restaurantsProperties = Object.keys(restaurantsObject);

// for (let pro of restaurantsProperties) {
    // console.log(restaurantsObject[pro]);

    // break;
// }
// console.log('-------------');


