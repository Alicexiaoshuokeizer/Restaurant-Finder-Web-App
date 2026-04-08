let postcode = 'CB3 0DS'; // do I need to preprocess the postcode here for api calling?
const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);
const data = await response.json();
const restaurantsArr = data.restaurants; // a array of restaurant objects

const isOpening = (restObjArr) => {
    return restObjArr.filter(x => x.isOpenNowForDelivery)
} //x.availability.delivery.isOpen

const hasFreeDelivery = (restObjArr) => {
    return restObjArr.filter(x => x.deliveryCost === 0);
}

const hasMinDeliValue = (restObjArr) => {
    return restObjArr.filter(x => x.minimumDeliveryValue > 0);
}

const newRest = (restObjArr) => {
    return restObjArr.filter(x => x.isNew === true);
}

const highlyRated = (restObjArr) => {
    return restObjArr.filter(x => x.rating.starRating > 4.5);
}

const sortByRate = (restObjArr, order = 'desc') => {
    if (order === 'desc') {
        return restObjArr.toSorted((a, b) => b.rating.starRating - a.rating.starRating )
    } else if ( order === 'asc') {
        return restObjArr.toSorted((a, b) => a.rating.starRating - b.rating.starRating )
    } else {
        throw new Error('second parameter order must be str: desc or str: asc');
    }
}

const sortByDeliTime = (restObjArr, order = 'asc') => {
    if (order === 'asc') {
        return restObjArr.toSorted((a, b) => a.deliveryEtaMinutes.rangeLower - b.deliveryEtaMinutes.rangeLower)
    }
}

const preOrder = (restObjArr) => {
    return restObjArr.filter(x => x.isOpenNowForPreorder === true);
}

class Restaurant {
    constructor(name, cuisines, rating, address) {
        this.name = name; // str
        this.cuisines = cuisines; // arr of str
        this.rating = rating; // num
        this.address = address; // str
    }
}

const showTenRestaurant = (restObjArr) => {
    // Name Cuisines Rating(number) Address
    const tenRestaurants = []
    let i = 0; // counter
    for (let restaurant of restObjArr) {
        // get values from object
        const resName = restaurant.name;
        const resCuisines = restaurant.cuisines;
        const resRating = restaurant.rating;
        const  resAddress = restaurant.address;

        // map useful info from cuisines (array of objects)
        const dishes = [];
        for (let dish of resCuisines) {
            dishes.push(dish.name);
        }

        // get starRatingNum out of resRating object
        const starRatingNum = resRating.starRating;

        //get address out of resAddress object
        const addressStr = `${resAddress.firstLine} ${resAddress.city} ${resAddress.postalCode}`;

        const oneRestaurant = new Restaurant(resName, dishes, starRatingNum, addressStr);
        tenRestaurants.push(oneRestaurant);

        i++;
        if (i > 9) {
            break;
        }
    }
    return tenRestaurants;
}



