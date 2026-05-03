const request = require('supertest');
const app = require('./index');

describe('API Tests', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /api/users', () => {
    it('should return an array of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user and return it', async () => {
      const newUser = { name: 'John Doe', email: 'john@example.com' };
      const response = await request(app)
        .post('/api/users')
        .send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });
  });
});
