import Router from "@koa/router";
import {followController} from "../controllers/FollowController";

const followRouter = new Router({
    prefix: '/follow'
});

followRouter.post('/', followController.follow);

followRouter.post('/cancel', followController.unfollow);

followRouter.get('/followers', followController.getFollowers);

followRouter.post('/followings', followController.getFollowings);

followRouter.post('/follower-count', followController.getFollowerCount);

followRouter.post('/following-count', followController.getFollowingCount);

export default followRouter;