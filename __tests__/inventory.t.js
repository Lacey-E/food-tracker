const express = require('express');
const supertest = require('supertest');
const router = require('../routes'); 
const inventoryController = require('../controllers/inventory');

jest.mock('../controllers/inventory', () => ({
  getAllInventoryItems: jest.fn(),
  getInventoryItemById: jest.fn(),
  createInventoryItem: jest.fn(),
  deleteInventoryItem: jest.fn(),
  updateInventoryItem: jest.fn(),
}));

const app = express();
app.use('/', router);

describe('Inventory Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllInventoryItems controller when receiving GET request to /', async () => {
    await supertest(app)
      .get('/')
      .expect(200);

    expect(inventoryController.getAllInventoryItems).toHaveBeenCalled();
  });

  it('should call getInventoryItemById controller when receiving GET request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .get(`/${id}`)
      .expect(200);

    expect(inventoryController.getInventoryItemById).toHaveBeenCalledWith(id);
  });

  it('should call createInventoryItem controller when receiving POST request to /', async () => {
    const newItem = { name: 'Item', quantity: 10 };

    await supertest(app)
      .post('/')
      .send(newItem)
      .expect(201);

    expect(inventoryController.createInventoryItem).toHaveBeenCalledWith(newItem);
  });

  it('should call deleteInventoryItem controller when receiving DELETE request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .delete(`/${id}`)
      .expect(204);

    expect(inventoryController.deleteInventoryItem).toHaveBeenCalledWith(id);
  });

  it('should call updateInventoryItem controller when receiving PUT request to /:id', async () => {
    const id = '123';
    const updatedItem = { name: 'Updated Item', quantity: 5 };

    await supertest(app)
      .put(`/${id}`)
      .send(updatedItem)
      .expect(200);

    expect(inventoryController.updateInventoryItem).toHaveBeenCalledWith(id, updatedItem);
  });
});
