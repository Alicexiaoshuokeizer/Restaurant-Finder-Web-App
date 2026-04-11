# README

- [README](#readme)
  - [Features](#features)
  - [Setup Instructions](#setup-instructions)
  - [Assumptions](#assumptions)
  - [Future Improvement](#future-improvement)


## Features
- Search restaurants by postcode input
- Display key details of first 10 of returned restaurants: name, cuisines, rating and address
- Responsive layout using Flexbox
- Dynamic rendering of API results using JavaScript
- Simple and user-friendly interface

## Setup Instructions
This project is implemented as a pure front-end application and communicates directly with the external REST API. When running locally(e.g. via Live Server) browser security policies may block API request due to [CORS restrictions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). To enable API access, a CORS bypassing browser extension(e.g. CORS Unblock) is required.

The front-end consists of just static html and javascript. There is no backend component, so the application can be served through any means of serving static files, even in the browser if the security policies allow it.

The following instructions are for running the app locally by using VS Code's Live Server to serve the files, and a CORS extension to bypass the CORS security policies from browsers.
 

1. Clone the repository
   ```
   $ git clone https://github.com/Alicexiaoshuokeizer/Restaurant-Finder-Web-App.git

   ```
    Alternatively, download the ZIP file and extract it.

2. Open folder in Visual Studio Code
3. Install Live Server: Search for `Live Server` in Extensions in VS Code. Install extension provided by Ritwick Dey.

4. Install _CORS Unblock_ extension in browser
    - [Chrome extension](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)
    - [Firefox extension](https://addons.mozilla.org/en-GB/firefox/addon/cors-unblock/)
  
5. Run the application: Open `index.html` in Visual Studio Code. Right click and select **Open with Live Server**

   The application will run locally at localhost at
    ```
    http://127.0.0.1:5500
    ```
6. Enable **CORS Unblock** extension. On the tab where you access localhost. Click on the extension. Click **Start** button.
   
7. Great! Web app is ready to use!
   - Enter a UK postcode 
   - Press `Enter` 
  
    A list of 10 restaurants around the postcode area will be displayed.

## Assumptions

The assignment specifies that the application should display the first 10 restaurants returned. I am not sure whether this refers to the first 10 results after applying any filtering logic or simply the first 10 entries from the API response. For now, I am assuming the latter interpretation: the application should display the first 10 restaurants directly from the API response without any additional reordering.

Another specified requirement is to display the restaurant data point--rating-as a number. There are multiple numbers in the `rating` object. I assume that `starRating` is the correct data to display.

## Future Improvement
**Solving CORS issues**

The current project is running locally and there are CORS issues due to CORS restrictions in browsers security policies. There are two approaches to solve the problem. One approach is to deploy the application under the same domain as the API it communicates with. This is simple, but it requires control over the API and domain. 

Another approach is to set up a proxy on the same domain as the static website is served, to communicate with external APIs and send the data to the front-end. This approach is more flexible and secure as the proxy can communicate with different APIs and hide sensitive data(e.g. API keys). The trade-off is that it increases system complexity.    

**Adding Features**

There are more properties in the restaurant objects, which enable filter implementation. Users can use filters to view restaurants that support free delivery, restaurants that have minimum order value for delivery and restaurants that are highly rated. I suggest introducing a sorting mechanism for restaurant rating and delivery time. I started working on these features--feel free to review them in this [draft pull request]().

<!-- Pagination for results and order: -->





