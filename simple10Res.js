async function getRestsAPI(postcode) { //Q: test invalid postcode
    //1.send request to API with provided postcode
    const response = await fetch(`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);
    const data = await response.json();

    //2.check location, if value is undefined: postcode is invalid
    if (!data.metaData.location) {
        console.log('invalid postcode, api function return false')
        return false;
    }
    //3.get an array of all restaurant objects near area of provided postcode
    const restObjArr = data.restaurants; 

    //4.return array
    return restObjArr;
}

// Create a Class to store restauratn info: Name Cuisines Rating(number) Address
class Restaurant {
    constructor(name, cuisines, rating, address) {
        this.name = name; // str
        this.cuisines = cuisines; // arr of str
        this.rating = rating; // num
        this.address = address; // str
    }
}

// function to extract first 10 restaurants' info
function getTenRests(restObjArr) {
    //1.create an arr to store first 10 class Restaurant instances
    const tenRests = []

    // 2.extract cuisines, starRating, address and name of each restarant object, store info in class Restaurant instance
    for (let rest of restObjArr) {
        //map through cuisines value(an arr of objects) to get all cuisine names
        const dishes = []; 
        for (let dish of rest.cuisines) {
            dishes.push(dish.name);
        }

        // get starRating from rating value(object)
        const starRating = rest.rating.starRating;

        //get address from address value(object)
        const address = rest.address;
        const addressStr = `${address.firstLine} ${address.city} ${address.postalCode}`;
        
        // store info in a Restaurant instance and push to arr
        const oneRest = new Restaurant(
            rest.name, 
            dishes, 
            starRating, 
            addressStr
        );
        tenRests.push(oneRest);

        // break loop when there are 10 restaurant instances in tenRests array
        if (tenRests.length >= 10) {
            break;
        }
    }

    return tenRests;
}

// Wrapper 
async function apiWrapper(postcode) {
    //1. get data from api
    const restObjArr = await getRestsAPI(postcode);

    //2.check data fromat correctness and return first 10 restaurants
    if (Array.isArray(restObjArr)) {
        const tenRests = getTenRests(restObjArr);
        return tenRests;
    }

    //3.if postcode invalid return value
    return 'invalid postcode';
}



