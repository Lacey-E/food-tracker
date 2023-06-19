# FoodTrack Web Application API

The FoodTrack Web Application API is designed to handle various functionalities related to user registration, profile management, inventory management, custom recipe creation, and shopping list management. This API serves as the backend for the FoodTrack web application, providing the necessary endpoints and functionality to support these features.

## Features

The API offers the following features:

* User Registration: Users can create new accounts by providing their necessary information.
* Profile Management: Users can view and update their profiles, including personal details, preferences, and dietary restrictions.
* Inventory Management: Users can manage their food inventory, add new items, update quantities, and remove items.
* Custom Recipe Creation: Users can create, view, update, and delete their custom recipes, including ingredients, instructions, and other details.
* Shopping List Management: Users can create and manage shopping lists, add items from their inventory or custom recipes, and mark items as purchased.

#### **Login System**

* [ ] **It will allow user registration and login, validating input data and ensuring the uniqueness of usernames and emails.**
* ** Users can provide credentials, which will be validated against existing users.**
* ** To handle sessions with OAuth providers like Google and GitHub, the API will incorporate middleware to authenticate tokens, decode them, and verify their signatures.**
* ** The login system will handle token expiration and refresh, allowing clients to obtain new valid JWTs.**

## Database

MongoDB

#### Collections

* User Profiles
* Inventory Items
* Custom Recipes
* Shopping Lists


## Endpoints

The API exposes the following endpoints:

* `POST /api/register`: Create a new user account.
* `POST /api/login`: Authenticate user and generate an access token.
* `GET /api/user/profile`: Retrieve user profile information.
* `PUT /api/user/profile`: Update user profile information.
* `GET /api/inventory`: Retrieve the user's food inventory.
* `POST /api/inventory`: Add a new item to the user's inventory.
* `PUT /api/inventory/:itemId`: Update an item in the user's inventory.
* `DELETE /api/inventory/:itemId`: Remove an item from the user's inventory.
* `GET /api/recipes`: Retrieve a list of user's custom recipes.
* `POST /api/recipes`: Create a new custom recipe.
* `GET /api/recipes/:recipeId`: Retrieve details of a specific custom recipe.
* `PUT /api/recipes/:recipeId`: Update a specific custom recipe.
* `DELETE /api/recipes/:recipeId`: Delete a specific custom recipe.
* `GET /api/shopping-list`: Retrieve the user's shopping list.
* `POST /api/shopping-list`: Add an item to the user's shopping list.
* `PUT /api/shopping-list/:itemId`: Update an item in the user's shopping list.
* `DELETE /api/shopping-list/:itemId`: Remove an item from the user's shopping list.



## Authentication

Authentication is required to access most of the endpoints. Users can authenticate by sending their credentials to the `/api/login` endpoint, which will return an access token. This token should be included in the `Authorization` header of subsequent requests as a Bearer token.

## Error Handling

The API provides appropriate error responses with status codes and descriptive error messages in case of any errors or invalid requests.

## Usage

To use this API, please refer to the API documentation or code samples for each endpoint. Make sure to include the necessary authentication headers when required.

## Contributors

* [Isaac Asiedu](https://github.com/Ike-Icon)
* [Esther Ezimadu](https://github.com/Lacey-E)
* [Laurels ECHICHINWO](https://github.com/laurells)
* [Richard Omachona](https://github.com)
* [Promise Igbojionu](https://github.com/promise-emmanuel)

Feel free to contribute to this project by submitting pull requests or reporting issues on GitHub.
