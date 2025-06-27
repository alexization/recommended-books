import {PostLikeServiceInterface} from "../services/interfaces/PostLikeServiceInterface";
import {postLikeService} from "../services/PostLikeService";
import {Context} from "koa";
import {ParamsPostLikeIdSchema} from "../validations/PostLikeValidation";
import {ResponseHandler} from "../utils/ResponseHandler";

export class PostLikeController {
    private readonly postLikeService: PostLikeServiceInterface;

    constructor() {
        this.postLikeService = postLikeService;
    }

    likePost = async (ctx: Context): Promise<void> => {
        const postId = ParamsPostLikeIdSchema.parse(ctx.params.postId);

        await this.postLikeService.likePost(ctx.state.user.id, postId);

        ResponseHandler.success(ctx, "성공적으로 해당 게시물에 좋아요를 등록했습니다.");
    };

    unlikePost = async (ctx: Context): Promise<void> => {
        const postId = ParamsPostLikeIdSchema.parse(ctx.params.postId);

        await this.postLikeService.unlikePost(ctx.state.user.id, postId);

        ResponseHandler.success(ctx, "성공적으로 해당 게시물에 좋아요를 취소했습니다.");
    }

    getLikeCountByPostId = async (ctx: Context): Promise<void> => {
        const postId = ParamsPostLikeIdSchema.parse(ctx.params.postId);

        const count = await this.postLikeService.getLikeCountByPostId(postId);

        ResponseHandler.success(ctx, "성공적으로 게시물의 총 좋아요 개수를 가져왔습니다.", count);
    };
}

export const postLikeController = new PostLikeController();