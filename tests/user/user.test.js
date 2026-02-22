import user from '../../routes/user.js';
import request from 'supertest';
import express from 'express';
import { describe, test } from 'vitest';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/', user);

describe('test user route', () => {
  test('check health of the user route', (done) => {
    request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect({ message: 'goodd' })
      .expect(200, done);
  });
});
