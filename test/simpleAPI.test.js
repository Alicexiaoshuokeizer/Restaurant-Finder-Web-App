import { describe, expect, it } from 'vitest'
import { getTenRests } from '../simpleAPI.js'
import data from './mockData_restaurants.json'

describe('test with mock restaurant data from valid postcode', 
    () => {
        it('should return an arr with 10 objects', 
            () => {
                const result = getTenRests(data.restaurants);
                expect(result.length).toBe(10);
            })
    })