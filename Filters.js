import { fetchAllRestaurants, getTenRests } from "./simpleAPI.js";

//Given restaurant data, return data in DESC/ASC order, order by starRating 
function sortByRate(data, order = 'DESC') {
    if (order === 'DESC') {
        return data.toSorted((a, b) => b.rating.starRating - a.rating.starRating )
    } else if ( order === 'ASC') {
        return data.toSorted((a, b) => a.rating.starRating - b.rating.starRating )
    } else {
        throw new Error('function sortByRate second parameter order must be str: DESC or str: ASC');
    }
}

//Given restaurant data, return data in DESC/ASC order, order by Delivery Time
function sortByDeliTime(data, order = 'ASC') {
    if (order === 'ASC') {
        return data.toSorted((a, b) => 
            a.deliveryEtaMinutes.rangeLower - b.deliveryEtaMinutes.rangeLower
        )
    } else if (order === 'DESC') {
        return data.toSorted((a, b) => 
            b.deliveryEtaMinutes.rangeLower - a.deliveryEtaMinutes.rangeLower
        )
    } else {
        throw new Error('function sortByDeliTime second parameter order must be str: DESC or str: ASC');
    }
}

//Filter class to descripe how the data will be filtered based on propterty values
class Filter {
    constructor(
        isNew = true, 
        freeDelivery,
        hasMinDeliValue, 
        highRated, 
        sortRate, 
        sortDeliTime) {
        //properties value boolean or undefined
        // if true, return restaurants that are new to the platform
        this.isNew = isNew; 
        // if true, return restaurants whose deliveryCost = 0
        this.freeDelivery = freeDelivery; 
        // if true, return restaurants whose deliveryCost > 0
        this.hasMinDeliValue = hasMinDeliValue; 
        // if true, return return restaurants whose starRating > 4.8
        this.highRated = highRated;  

        //following two properties has one of these values: 'ASC', 'DESC', undefined
        // if 'ASC', return restaurant data in ascending order based on starRating, if 'DESC', do opposite, if undefined, do nothing
        this.sortRate = sortRate; 
        // if 'ASC', return restaurant data in ascending order based on delivery time, if 'DESC', do opposite, if undefined, do nothing
        this.sortDeliTime = sortDeliTime; 
    }
}

// Given full restaurant data, return only restaurant data that meet requirements from the Filter class
function restaurantFilter(restaurantData, filter) {

    //1. always return data of restaurants that are open
    let data = restaurantData.filter(x => x.isOpenNowForDelivery == true);
    
    //2. filter data based on properties in Filter object
    if (filter.isNew) {
        data = data.filter(x => x.isNew === true);
    }

    if (filter.hasMinDeliValue) {
        data = data.filter(x => x.minimumDeliveryValue > 0);
    }

    if (filter.freeDelivery) {
        data = data.filter(x => x.deliveryCost === 0);
    }

    if (filter.highRated) {
        data = data.filter(x => x.rating.starRating > 4.8);
    }

    if (filter.sortRate) {
        data = sortByRate(data, filter.sortRate);
    }

    if (filter.sortDeliTime) {
        data = sortByDeliTime(data, filter.sortDeliTime);
    }

    return data;
}

// Test
let postcode = 'CB3 0DS';
let restaurantData = await fetchAllRestaurants(postcode);

const filter1 = new Filter()
filter1.isNew = undefined;
filter1.freeDelivery = false;
filter1.hasMinDeliValue = true;
filter1.highRated = false;
filter1.sortRate = 'ASC';
filter1.sortDeliTime = 'ASC';
const filteredData = restaurantFilter(restaurantData, filter1);

const tenRestaurants = getTenRests(filteredData);
console.log(tenRestaurants);

/*consider situation where after filter, there are less than 10 restaurants that are opened, dislay restaurants that can preorder (property:  "isOpenNowForPreorder", check time in"nextAvailability") 
*/








