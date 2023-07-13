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
  test('responds to /', async () => {
    const response = await request.get('/');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /users', async () => {
    const response = await request.get('/users');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /users/:id', async () => {
    const userId = '123'; // Replace with a valid user ID
    const response = await request.get(`/users/${userId}`);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /inventory', async () => {
    const response = await request.get('/inventory');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /inventory/:id', async () => {
    const inventoryId = '123'; // Replace with a valid inventory item ID
    const response = await request.get(`/inventory/${inventoryId}`);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /recipes', async () => {
    const response = await request.get('/recipes');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /recipes/:id', async () => {
    const recipeId = '123'; // Replace with a valid recipe ID
    const response = await request.get(`/recipes/${recipeId}`);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /shoppingList', async () => {
    const response = await request.get('/shoppingList');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /shoppingList/:id', async () => {
    const shoppingListId = '123'; // Replace with a valid shopping list ID
    const response = await request.get(`/shoppingList/${shoppingListId}`);
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /dataGenerator', async () => {
    const response = await request.get('/dataGenerator');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /swagger', async () => {
    const response = await request.get('/');
    expect(response.header['content-type']).toContain('application/json; charset=utf-8');
    expect(response.statusCode).toBe(200);
  });
});
