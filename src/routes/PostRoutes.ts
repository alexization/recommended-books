import Router from "@koa/router";
import {postController} from "../controllers/PostController";

const postRouter = new Router({
    prefix: '/posts',
});

postRouter.post('/', postController.createPost);