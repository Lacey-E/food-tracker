const express = require('express');
const supertest = require('supertest');
const router = require('../routes'); 

const app = express();
app.use('/', router);

describe('Router', () => {
  it('should include the swagger router', () => {
    return supertest(app)
      .get('/swagger') 
      .expect(200);
  });

  it('should include the users router', () => {
    return supertest(app)
      .get('/users') 
      .expect(200);
  });

  it('should include the inventory router', () => {
    return supertest(app)
      .get('/inventory') 
      .expect(200);
  });

  it('should include the recipes router', () => {
    return supertest(app)
      .get('/recipes') 
      .expect(200);
  });

  it('should include the shoppingList router', () => {
    return supertest(app)
      .get('/shoppingList') 
      .expect(200);
  });

  it('should include the dataGenerator router', () => {
    return supertest(app)
      .get('/dataGenerator') 
      .expect(200);
  });

  it('should include the swagger router on the root path', () => {
    return supertest(app)
      .get('/') 
      .expect(200);
  });
});
