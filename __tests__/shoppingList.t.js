const express = require('express');
const supertest = require('supertest');
const router = require('../routes'); 
const shopController = require('../controllers/shoppingList');

jest.mock('../controllers/shoppingList', () => ({
  getAllShoppingLists: jest.fn(),
  getShoppingListById: jest.fn(),
  createShoppingList: jest.fn(),
  deleteShoppingList: jest.fn(),
  putShoppingList: jest.fn(),
}));

const app = express();
app.use('/', router);

describe('Shopping List Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllShoppingLists controller when receiving GET request to /', async () => {
    await supertest(app)
      .get('/')
      .expect(200);

    expect(shopController.getAllShoppingLists).toHaveBeenCalled();
  });

  it('should call getShoppingListById controller when receiving GET request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .get(`/${id}`)
      .expect(200);

    expect(shopController.getShoppingListById).toHaveBeenCalledWith(id);
  });

  it('should call createShoppingList controller when receiving POST request to /', async () => {
    const newShoppingList = { name: 'Shopping List', items: ['Item 1', 'Item 2'] };

    await supertest(app)
      .post('/')
      .send(newShoppingList)
      .expect(201);

    expect(shopController.createShoppingList).toHaveBeenCalledWith(newShoppingList);
  });

  it('should call deleteShoppingList controller when receiving DELETE request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .delete(`/${id}`)
      .expect(204);

    expect(shopController.deleteShoppingList).toHaveBeenCalledWith(id);
  });

  it('should call putShoppingList controller when receiving PUT request to /:id', async () => {
    const id = '123';
    const updatedShoppingList = { name: 'Updated Shopping List', items: ['Item 1', 'Item 2'] };

    await supertest(app)
      .put(`/${id}`)
      .send(updatedShoppingList)
      .expect(200);

    expect(shopController.putShoppingList).toHaveBeenCalledWith(id, updatedShoppingList);
  });
});
