import {FollowServiceInterface} from "../services/interfaces/FollowServiceInterface";
import {followService} from "../services/FollowService";
import {Context} from "koa";
import {ParamPageSchema, QueryFollowIdSchema} from "../validations/FollowValidation";
import {ResponseHandler} from "../utils/ResponseHandler";

export class FollowController {

    private readonly followService: FollowServiceInterface;

    constructor() {
        this.followService = followService;
    }

    follow = async (ctx: Context): Promise<void> => {
        const followingId = QueryFollowIdSchema.parse(ctx.query.followingId);
        const followerId = QueryFollowIdSchema.parse(ctx.query.followerId);

        await this.followService.follow(followingId, followerId);

        ResponseHandler.success(ctx, "성공적으로 팔로우 했습니다.");
    };

    unfollow = async (ctx: Context): Promise<void> => {
        const followingId = QueryFollowIdSchema.parse(ctx.query.followingId);
        const followerId = QueryFollowIdSchema.parse(ctx.query.followerId);

        await this.followService.unfollow(followingId, followerId);

        ResponseHandler.success(ctx, "성공적으로 팔로우를 취소했습니다.");
    }

    getFollowers = async (ctx: Context): Promise<void> => {
        const page = ParamPageSchema.parse(ctx.query.page);

        const followers = await this.followService.getFollowers(ctx.state.user.id, page);

        ResponseHandler.success(ctx, "성공적으로 팔로워들을 가져왔습니다.", followers);
    };

    getFollowings = async (ctx: Context): Promise<void> => {
        const page = ParamPageSchema.parse(ctx.query.page);

        const followings = await this.followService.getFollowings(ctx.state.user.id, page);

        ResponseHandler.success(ctx, "성공적으로 팔로잉을 가져왔습니다.", followings);
    };

    getFollowerCount = async (ctx: Context): Promise<void> => {
        const count = await this.followService.getFollowerCount(ctx.state.user.id);

        ResponseHandler.success(ctx, "성공적으로 팔로워 수를 가져왔습니다.", count);
    };

    getFollowingCount = async (ctx: Context): Promise<void> => {
        const count = await this.followService.getFollowingCount(ctx.state.user.id);

        ResponseHandler.success(ctx, "성공적으로 팔로잉 수를 가져왔습니다.", count);
    };
}

export const followController = new FollowController();