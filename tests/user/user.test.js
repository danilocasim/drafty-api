import user from '../../routes/user.js';
import request from 'supertest';
import express from 'express';
import { describe, it, beforeAll, expect, beforeAll } from 'vitest';
import { prisma as db } from '../../prisma/lib/test_prisma.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', user);

describe('test user route', () => {
  beforeAll(async () => {
    await db.user.deleteMany();
  });

  it('should check health of the user route', async () => {
    const req = await request(app).get('/health');

    expect(req.text).toBe(JSON.stringify({ message: 'good' }));
  });

  it('should add user then check if the user exist', async () => {
    const signupReq = await request(app).post('/signup').send({
      email: 'dan@gmail.com',
      password: 'hashedPassword',
      role: 'READER',
      username: 'user',
    });

    const getUserReq = await request(app)
      .post('/login')
      .send({ email: 'dan@gmail.com', password: 'hashedPassword' });

    expect(getUserReq.body.message).toBe('Auth Passed');
  });

  it('should be able to authenticate the login', async () => {
    const signupReq = await request(app).post('/signup').send({
      email: 'dan@gmail.com',
      password: 'hashedPassword',
      role: 'READER',
      username: 'user',
    });

    const getUserReq = await request(app)
      .post('/login')
      .send({ email: 'dan@gmail.com', password: 'hashedPassword' });

    const token = getUserReq.body.token;

    const authUser = await request(app)
      .get('/auth')
      .set('Authorization', `Bearer: ${token}`);

    expect(authUser.ok).toBeTruthy();
  });
});
