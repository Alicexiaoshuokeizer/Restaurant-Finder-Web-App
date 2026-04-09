const getRestaurantAPI = async (postcode) => { //Q: test invalid postcode
    //1. send request to API with provided postcode
    const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);
    const data = await response.json();

    //2. get an array of all restaurant objects near area of provided postcode
    const restaurantsArr = data.restaurants; 

    //3. return array
    return restaurantsArr;
}

class Restaurant {
    constructor(name, cuisines, rating, address) {
        this.name = name; // str
        this.cuisines = cuisines; // arr of str
        this.rating = rating; // num
        this.address = address; // str
    }
}

const getTenRestaurant = (restObjArr) => {
    // Name Cuisines Rating(number) Address
    const tenRestaurants = []

    // console.log(restObjArr);
    for (let rest of restObjArr) {
        // map useful info from cuisines (array of objects)
        const dishes = [];
        for (let dish of rest.cuisines) {
            dishes.push(dish.name);
        }

        // get starRatingNum out of resRating object
        const starRatingNum = rest.rating.starRating;

        //get address out of resAddress object
        const address = rest.address;
        const addressStr = `${address.firstLine} ${address.city} ${address.postalCode}`;

        const oneRestaurant = new Restaurant(
            rest.name, 
            dishes, 
            starRatingNum, 
            addressStr
        );
        tenRestaurants.push(oneRestaurant);

        // break loop when there are 10 restaurant objects in the tenRestaurants Array
        if (tenRestaurants.length >= 10) {
            break;
        }
    }
    return tenRestaurants;
}

const restaurantsArr = await getRestaurantAPI('CB3 0DS');
const tenRestaurants = getTenRestaurant(restaurantsArr);
console.log(tenRestaurants);