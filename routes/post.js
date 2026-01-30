import { Router } from 'express';
import postController from '../controllers/post.js';
import authenticate from '../middleware/authentication.js';
import verifyToken from '../middleware/verifyToken.js';
import authorize from '../middleware/authorization.js';

const postRouter = Router();

postRouter.post('/', verifyToken, authenticate, postController.addPost);
postRouter.get('/', postController.getAllPublicPost);

postRouter.post('/search', postController.getAllPostByTitle);

postRouter.get(
  '/public',
  verifyToken,
  authenticate,
  postController.getMyAllPublicPost,
);
postRouter.get(
  '/private',
  verifyToken,
  authenticate,
  postController.getMyAllPrivatePost,
);

postRouter.get(
  '/category/:categoryId',
  verifyToken,
  authenticate,
  postController.getMyPostsByCategoryId,
);

postRouter.get('/:postId', postController.getMyPost);

postRouter.get('/public/:postId', postController.getMyPublicPost);

postRouter.put(
  '/:postId',
  verifyToken,
  authenticate,
  authorize.post,
  postController.editPost,
);

postRouter.delete(
  '/:postId',
  verifyToken,
  authenticate,
  authorize.post,
  postController.deletePost,
);

postRouter.put(
  '/:postId/publish',
  verifyToken,
  authenticate,
  authorize.post,
  postController.togglePublishPost,
);

postRouter.post(
  '/:postId/comment',
  verifyToken,
  authenticate,
  postController.addComment,
);

postRouter.get(
  '/:postId/comment',
  verifyToken,
  authenticate,
  postController.getPostComments,
);

postRouter.put(
  '/:postId/comment/:commentId',
  verifyToken,
  authenticate,
  authorize.comment,
  postController.editComment,
);

postRouter.delete(
  '/:postId/comment/:commentId',
  verifyToken,
  authenticate,
  authorize.comment,
  postController.deleteComment,
);

export default postRouter;
