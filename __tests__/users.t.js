const express = require('express');
const supertest = require('supertest');
const router = require('../routes'); 
const userController = require('../controllers/users');

jest.mock('../controllers/users', () => ({
  getAllUserProfiles: jest.fn(),
  getUserProfileById: jest.fn(),
  createUserProfile: jest.fn(),
}));

const app = express();
app.use('/', router);

describe('User Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllUserProfiles controller when receiving GET request to /', async () => {
    await supertest(app)
      .get('/')
      .expect(200);

    expect(userController.getAllUserProfiles).toHaveBeenCalled();
  });

  it('should call getUserProfileById controller when receiving GET request to /:id', async () => {
    const id = '123';

    await supertest(app)
      .get(`/${id}`)
      .expect(200);

    expect(userController.getUserProfileById).toHaveBeenCalledWith(id);
  });

  it('should call createUserProfile controller when receiving POST request to /', async () => {
    const newUserProfile = { name: 'John Doe', age: 30 };

    await supertest(app)
      .post('/')
      .send(newUserProfile)
      .expect(201);

    expect(userController.createUserProfile).toHaveBeenCalledWith(newUserProfile);
  });
});
