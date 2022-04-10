import supertest from 'supertest';
import { app } from '../app';

describe('GET /api/v1/version', () => {
  it('test GET api/v1/version', async () => {
    await supertest(app)
      .get('/api/v1/version')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});
