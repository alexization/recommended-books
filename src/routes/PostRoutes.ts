import Router from "@koa/router";
import {postController} from "../controllers/PostController";

const postRouter = new Router({
    prefix: '/posts',
});

/**
 * @swagger
 * /posts:
 *  post:
 *      summary: 게시물 등록
 *      tags: [Posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreatePostData'
 *      responses:
 *          200:
 *              description: 성공
 * */
postRouter.post('/', postController.createPost);

postRouter.put('/', postController.updatePost);

postRouter.delete('/:id', postController.deletePost);

postRouter.get('/:id', postController.getPost);

export default postRouter;