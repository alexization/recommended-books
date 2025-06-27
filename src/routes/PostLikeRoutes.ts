import Router from "@koa/router";
import {postLikeController} from "../controllers/PostLikeController";

const postLikeRoutes = new Router({
    prefix: '/postLike'
})

postLikeRoutes.post('/like/:postId', postLikeController.likePost);

postLikeRoutes.post('/unlike/:postId', postLikeController.unlikePost);

postLikeRoutes.get('/total-likes/:postId', postLikeController.getLikeCountByPostId);

export default postLikeRoutes;
