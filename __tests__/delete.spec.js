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
    test('responds to DELETE /users/:id', async () => {
        const userId = '123'; // Replace with a valid user ID
    
        const response = await request.delete(`/users/${userId}`);
        expect(response.statusCode).toBe(204);
      });
    
      test('responds to DELETE /inventory/:id', async () => {
        const inventoryItemId = '123'; // Replace with a valid inventory item ID
    
        const response = await request.delete(`/inventory/${inventoryItemId}`);
        expect(response.statusCode).toBe(204);
      });
    
      test('responds to DELETE /recipes/:id', async () => {
        const recipeId = '123'; // Replace with a valid recipe ID
    
        const response = await request.delete(`/recipes/${recipeId}`);
        expect(response.statusCode).toBe(204);
      });
    
      test('responds to DELETE /shoppingList/:id', async () => {
        const shoppingListId = '123'; // Replace with a valid shopping list ID
    
        const response = await request.delete(`/shoppingList/${shoppingListId}`);
        expect(response.statusCode).toBe(204);
      });
    });