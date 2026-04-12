import { describe, expect, it } from 'vitest'
import { getTenRests } from '../simpleAPI.js'
import data from './mockData_restaurants.json'
import correctResults from './mockData_correctResults.json'

describe('test with mock restaurant data from valid postcode', 
    () => {
        it('should return an arr with 10 objects', 
            () => {
                const result = getTenRests(data.restaurants);
                expect(result.length).toBe(10);
            })
    })


describe('test with mock restaurant data from valid postcode',
    () => {
        it('should return exactly the same output as correctResults',
            () => {
                const output = getTenRests(data.restaurants);
                expect(output).toEqual(correctResults);
            }
        )
    }
)

describe('test with invalide postcode restaurant data',
    () => {
        it('should return str: invalid postcode',
            () => {
                const output = getTenRests(null);
                expect(output).toEqual('invalid postcode');
            }
        )
    }
)

