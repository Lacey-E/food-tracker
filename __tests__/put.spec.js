const app = require('../app');
const supertest = require('supertest');
const { expect } = require('@jest/globals');

const request = supertest(app);

describe('Test Handlers', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });
  test('responds to PUT /users/:id', async () => {
    const userId = '123'; 
    const updatedUserData = {
      name: 'John Doe Updated',
      email: 'johndoe@example.com',
      // ...
    };

    const response = await request.put(`/users/${userId}`).send(updatedUserData);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(userId);
  });

  test('responds to PUT /inventory/:id', async () => {
    const inventoryItemId = '123'; // Replace with a valid inventory item ID
    const updatedInventoryItem = {
      // Replace with the necessary updated inventory item data
      name: 'Updated Item',
      quantity: 20,
      // ...
    };

    const response = await request.put(`/inventory/${inventoryItemId}`).send(updatedInventoryItem);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(inventoryItemId);
  });

  test('responds to PUT /recipes/:id', async () => {
    const recipeId = '123'; // Replace with a valid recipe ID
    const updatedRecipe = {
      // Replace with the necessary updated recipe data
      name: 'Updated Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      // ...
    };

    const response = await request.put(`/recipes/${recipeId}`).send(updatedRecipe);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(recipeId);
  });

  test('responds to PUT /shoppingList/:id', async () => {
    const shoppingListId = '123'; // Replace with a valid shopping list ID
    const updatedShoppingList = {
      // Replace with the necessary updated shopping list data
      name: 'Updated Shopping List',
      items: ['Updated Item 1', 'Updated Item 2'],
      // ...
    };

    const response = await request.put(`/shoppingList/${shoppingListId}`).send(updatedShoppingList);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(shoppingListId);
  });
});