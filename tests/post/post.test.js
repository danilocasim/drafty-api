import post from '../../routes/post.js';
import user from '../../routes/user.js';
import request from 'supertest';
import express from 'express';
import { describe, it, beforeAll, expect, afterAll } from 'vitest';
import { prisma as db } from '../../prisma/lib/test_prisma.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', user);
app.use('/post', post);

afterAll(async () => {
  await db.user.deleteMany();
  await db.category.deleteMany();
  await db.post.deleteMany();
});
describe('test post route', () => {
  it('should be able to post a blog', async () => {
    const signupReq = await request(app).post('/user/signup').send({
      email: 'dan@gmail.com',
      password: 'hashedPassword',
      role: 'READER',
      username: 'user',
    });

    const getUserReq = await request(app)
      .post('/user/login')
      .send({ email: 'dan@gmail.com', password: 'hashedPassword' });

    const { token } = getUserReq.body;

    const postReq = await request(app)
      .post('/post')
      .set('Authorization', `Bearer: ${token}`)
      .send({
        title: 'New Blog Title',
        description: 'New Description',
        content: 'New Content',
        isPublish: true,
        categoryName: 'New Category',
      });

    const postId = postReq.body.data.id;
    expect(postReq.body.data.title).toBe('New Blog Title');

    const getPostReq = await request(app).get(`/post/${postId}`);

    expect(getPostReq.body.data.id).toBe(postId);
  });
});
