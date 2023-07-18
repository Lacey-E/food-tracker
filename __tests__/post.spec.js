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
  test('responds to POST /users', async () => {
    const newUser = {
      // Replace with the necessary user data for creation
      name: 'John Doe',
      email: 'johndoe@example.com',
      // ...
    };

    const response = await request.post('/users').send(newUser);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });

  test('responds to POST /inventory', async () => {
    const newInventoryItem = {
      // Replace with the necessary inventory item data for creation
      name: 'Item',
      quantity: 10,
      // ...
    };

    const response = await request.post('/inventory').send(newInventoryItem);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });

  test('responds to POST /recipes', async () => {
    const newRecipe = {
      // Replace with the necessary recipe data for creation
      name: 'Chocolate Cake',
      ingredients: ['Flour', 'Sugar', 'Cocoa Powder'],
      // ...
    };

    const response = await request.post('/recipes').send(newRecipe);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });

  test('responds to POST /shoppingList', async () => {
    const newShoppingList = {
      // Replace with the necessary shopping list data for creation
      name: 'My Shopping List',
      items: ['Item 1', 'Item 2', 'Item 3'],
      // ...
    };

    const response = await request.post('/shoppingList').send(newShoppingList);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
  });
});
