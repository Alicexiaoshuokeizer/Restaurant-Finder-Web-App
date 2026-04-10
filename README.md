# README

- [README](#readme)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Setup Instructions](#setup-instructions)
  - [Future Improvement](#future-improvement)


## Project Structure

```
Restaurant-Finder-Web-App/
│
├── src
├── index.html
├── index.js
├── simpleAPI.js
├── README.md
└── package.json
```

## Features
- Search restaurants by postcode input
- Display key details of first 10 of returned restaurants
  - Name
  - Cuisines
  - Rating
  - Address
  - 
- Responsive layout using Flexbox
- Dynamic rendering of API results using JavaScript
- Simple and user-friendly interface

## Tech Stack
- HTML5
- CSS3 (Flexbox)
- JavaScript
- External REST API

## Setup Instructions
1. Download the project
   clone the repository
   ```
   $ git clone https://github.com/Alicexiaoshuokeizer/Restaurant-Finder-Web-App.git

   ```
    Alternatively, download the ZIP file and extract it.

2. Open folder in Visual Studio Code
3. Install Live Server
   - Search for `Live Server` in Extensions in VS Code
   - Install extension provided by Ritwick Dey

4. Install _CORS Unblock_ extension in browser

    **IMPORTANT**: This project uses an external API. During local development, API requests may be blocked by browsers due to the [CORS restrictions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS). To solve this during development, _CORS Unblock_ extension is required to run the web app. 
    - [Chrome](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)
    - [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/cors-unblock/)
  
5. Run the application
   - Open `index.html` in Visual Studio Code
   - Right click and select **Open with Live Server**

    The application will run locally at localhost at
    ```
    http://127.0.0.1:5500
    ```
6. Enable **CORS Unblock** extension. On the tab where you access localhost.
   - click the extension
   - click **Start**
   
7. Web app is ready to use
   - Enter a UK postcode 
   - Press `Enter` 
  
    A list of 10 restaurants around the postcode area will be displayed.

## Future Improvement
There are more details about restaurants from the API, such as is the restaurant open, is it ready for pre-order, is it a new restaurant on the platform, etc. This make it possible to develop more features to improve the web app.

Below are some aspects/features that can be developed in the future

1. Filter Features
   - Default Filter
   - Free Delivery
   - Min Delivery

2. Sort Features 
    - Sort by rating
    - Sort by delivery time

3. Pagination for results and order




