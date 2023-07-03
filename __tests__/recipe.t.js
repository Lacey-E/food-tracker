const express = require('express');
const supertest = require('supertest');
const router = require('../routes'); 
const recipeController = require('../controllers/recipes');

jest.mock('../controllers/recipes', () => ({
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  createRecipe: jest.fn(),
  deleteRecipe: jest.fn(),
  updateRecipe: jest.fn(),
}));

const app = express();
app.use('/', router);

describe('Recipes Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllRecipes controller when receiving GET request to /', async () => {
    await supertest(app)
      .get('/')
      .expect(200);

    expect(recipeController.getAllRecipes).toHaveBeenCalled();
  });

  it('should call getRecipeById controller when receiving GET request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .get(`/${id}`)
      .expect(200);

    expect(recipeController.getRecipeById).toHaveBeenCalledWith(id);
  });

  it('should call createRecipe controller when receiving POST request to /', async () => {
    const newRecipe = { name: 'Recipe', ingredients: ['Ingredient 1', 'Ingredient 2'] };

    await supertest(app)
      .post('/')
      .send(newRecipe)
      .expect(201);

    expect(recipeController.createRecipe).toHaveBeenCalledWith(newRecipe);
  });

  it('should call deleteRecipe controller when receiving DELETE request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .delete(`/${id}`)
      .expect(204);

    expect(recipeController.deleteRecipe).toHaveBeenCalledWith(id);
  });

  it('should call updateRecipe controller when receiving PUT request to /:id', async () => {
    const id = '123';
    const updatedRecipe = { name: 'Updated Recipe', ingredients: ['Ingredient 1', 'Ingredient 2'] };

    await supertest(app)
      .put(`/${id}`)
      .send(updatedRecipe)
      .expect(200);

    expect(recipeController.updateRecipe).toHaveBeenCalledWith(id, updatedRecipe);
  });
});
