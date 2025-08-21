const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  it('GET /health - should return server status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Server is running!');
  });

  it('GET /api/items - should return empty array initially', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
