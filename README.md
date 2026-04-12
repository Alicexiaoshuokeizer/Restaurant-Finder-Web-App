# README

- [README](#readme)
  - [Features](#features)
  - [Setup Instructions](#setup-instructions)
  - [Assumptions](#assumptions)
  - [Future Improvement](#future-improvement)
  - [Challenges](#challenges)


## Features
- Search restaurants by postcode input
- Display key details of first 10 of returned restaurants: name, cuisines, rating and address
- Responsive layout using Flexbox
- Dynamic rendering of API results using JavaScript
- Simple and user-friendly interface

## Setup Instructions
This project is implemented as a pure front-end application and communicates with the external REST API via a local proxy. 

0. Check and make sure your Node.js version is at least 20.19+ or 22.12+

1. Clone the repository
   ```
   $ git clone https://github.com/Alicexiaoshuokeizer/Restaurant-Finder-Web-App.git

   ```
    Alternatively, download the ZIP file and extract it.

2. Run `npm install` in the terminal in the project directory
   
3. Run `npm run dev` to start the server,
   the web app is available at `http://localhost:5173` 

4. Great! Web app is ready to use!
   - Enter a UK postcode 
   - Press `Enter` 
  
    A list of 10 restaurants around the postcode area will be displayed.

5. Run tests for the project by running `npm run test` in the terminal in the project directory  

## Assumptions

The assignment specifies that the application should display the first 10 restaurants returned. I am not sure whether this refers to the first 10 results after applying any filtering logic or simply the first 10 entries from the API response. For now, I am assuming the latter interpretation: the application should display the first 10 restaurants directly from the API response without any additional reordering.

Another specified requirement is to display the restaurant data point--rating-as a number. There are multiple numbers in the `rating` object. I assume that `starRating` is the correct data to display.

## Future Improvement
**Adding Features**

There are more properties in the restaurant objects, which enable filter implementation. Users can use filters to view restaurants that support free delivery, restaurants that have minimum order value for delivery and restaurants that are highly rated. I suggest introducing a sorting mechanism for restaurant rating and delivery time. I started working on these features--feel free to review them in this [draft pull request](https://github.com/Alicexiaoshuokeizer/Restaurant-Finder-Web-App/pull/1).

**Configure Production Server**

Currently, in local development, the project uses [vite](https://vite.dev/) to serve the web application and communicate with the API. In a production environment, we should configure a production server such as Nginx or Apache.

## Challenges
**Solving CORS issues**

Initially the front-end talked directly with the API, but there are CORS issues due to CORS restrictions in browsers security policies. CORS Unblock extensions were used to bypass CORS restrictions, which make the setup of the development troublesome. 

There are two approaches to solve the problem. One approach is to deploy the application under the same domain as the API it communicates with. This is simple, but it requires control over the API and domain. Since I don't have the control of the domain, I set up a proxy to communicate with the API with vite.
