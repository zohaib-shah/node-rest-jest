const app = require('../app'); 
const supertest = require('supertest');
const faker = require('faker');
const model = require('./../models');
const request = supertest(app);
const {
  Sequelize
} = require('sequelize');
var post_id = 0;
it('Lists all posts', async () => {
  const res = await request.get('/posts');
  expect(res.statusCode).toEqual(200)
});
it('Create a new post', async () => {
    const res = await request.post('/posts')
      .send({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.name.firstName(),
        createdAt : new Date()
      });
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('id');  
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('author');
    post_id = res.body.id;
});
it('List specific post', async () => {
  const response = await request.get('/posts/'+post_id);
  expect(response.status).toBe(200);
  //expect(response.body).toEqual(expect.arrayContaining([export.objectContaining({"id":45})]));
});
it('Update specific post', async () => {
  const description = faker.lorem.paragraph();
  const response = await request.put('/posts/'+post_id).send({ description : description });
  expect(response.status).toBe(200);
  expect(response.body.description).toEqual(description);
  //expect(response.body).toEqual(expect.arrayContaining([export.objectContaining({"id":45})]));
});

it('Post can be deleted', async () => {
  const res = await request.delete('/posts/'+post_id);
  expect(res.statusCode).toEqual(202);
});
