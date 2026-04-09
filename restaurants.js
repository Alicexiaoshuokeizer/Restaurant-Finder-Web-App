// 
const getRestaurantAPI = async (postcode) => { //Q: preprocess postcode format?
    //1. send request to API with provided postcode
    const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);
    const data = await response.json();

    //2. get an array of all restaurant objects near area of provided postcode
    const restaurantsArr = data.restaurants; 

    //3. return array
    return restaurantsArr;
}

// isOpen, freeDeli, hasMinDeliVal, isNewRest, highRated, preOrder, sortByRate, sortByDeliTime

const isOpening = (restObjArr) => {
    return restObjArr.filter(x => x.isOpenNowForDelivery)
} //x.availability.delivery.isOpen

const hasFreeDelivery = (restObjArr) => {
    return restObjArr.filter(x => x.deliveryCost === 0);
}

const hasMinDeliValue = (restObjArr) => {
    return restObjArr.filter(x => x.minimumDeliveryValue > 0);
}

const isNewRest = (restObjArr) => {
    return restObjArr.filter(x => x.isNew === true);
}

const highRated = (restObjArr) => {
    return restObjArr.filter(x => x.rating.starRating > 4.5);
}

const preOrder = (restObjArr) => {
    return restObjArr.filter(x => x.isOpenNowForPreorder === true);
}

const sortByRate = (restObjArr, order = 'desc') => {
    if (order === 'desc') {
        return restObjArr.toSorted((a, b) => b.rating.starRating - a.rating.starRating )
    } else if ( order === 'asc') {
        return restObjArr.toSorted((a, b) => a.rating.starRating - b.rating.starRating )
    } else {
        throw new Error('function sortByRate second parameter order must be str: desc or str: asc');
    }
}

const sortByDeliTime = (restObjArr, order = 'asc') => {
    if (order === 'asc') {
        return restObjArr.toSorted((a, b) => a.deliveryEtaMinutes.rangeLower - b.deliveryEtaMinutes.rangeLower)
    } else if (order === 'desc') {
        return restObjArr.toSorted((a, b) => b.deliveryEtaMinutes.rangeLower - c.deliveryEtaMinutes.rangeLower)
    } else {
        throw new Error('function sortByDeliTime second parameter order must be str: desc or str: asc');
    }
}

// isOpen, freeDeli, hasMinDeliVal, isNewRest, highRated, preOrder, 
const restFilter = (restObjArr, isOpen=true , hasMinDeliVal=undefined, isNewRest=undefined, freeDeli=undefined, highRated=undefined) => {
    let objArr = isOpening(restObjArr);

    if (hasMinDeliVal) {
        objArr = hasMinDeliValue(objArr);
    }

    if (isNewRest) {
        objArr = isNewRest(objArr);
    }

    if (freeDeli) {
        objArr = hasFreeDelivery(objArr);
    }

    if (highRated) {
        objArr = highRated(objArr);
    }

    return objArr
}

// if there are less than 10 restaurants after filtering, use preOrder function
const RecomPreorder = (restObjArr, num, preOrder=true, highRated=true) => {
    //1.filter restaurant isNowOpenForPreorder and are highly rated
    let recomArr = preOrder(restObjArr);
    recomArr = highRated(recomArr);

    //2. Pick num of unique random restObj from the filtered recomArr
    randArr = [];
    i = 0;    
    while (i < num){
        index = Math.floor(Math.random() * recomArr.length)
        const pick = recomArr[index];
        if (!randArr.includes(pick)){
            randIndex.push(pick);
            i++;    
        }
    }

    return randArr; 
}

// extra sorting steps: sortByRate, sortByDeliTime


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
        // break loop when there are 10 restaurant objects in the tenRestaurants Array
        if (i > 9) {
            break;
        }
    }
    return tenRestaurants;
}

const main = (restObjArr, paraArr, sortArr) => {
    // 1. get filtered array, initial filter: opened restarurants
    const Array = restFilter(restObjArr);

    //2. if less than 10 restaurants are open, recommand restaurant that are ready to preOrder to complement
    if (Array.length < 10) {
        const num = 10-Array.length 
        const recomArr = RecomPreorder(restObjArr, num);
    }

    const returnArr = getTenRestaurant(Array);

    return returnArr;
}

const restaurantsArr =  getRestaurantAPI('CB3 0DS');






// THE OTHER WAY
class FilterOptions {
    constructor() {
        this.requiredOpen = true;
        this.minimumStars = 3;
        this.includePreOrder = false;
    }
}

// opt has to be FilterOptions
function filterResultsClass(results, opt) {
    if (opt.requiredOpen) { 
        results = foo(results)
    }

    results = withMinimumStars(results, opt.minimumStars)

    if (opt.includePreOrder) {
        results = bar(results)
    }
}

function useFilterClass() {
    let opt = new FilterOptions();
    opt.includePreOrder = true;

    filterResultsClass(results, opt)
} 


