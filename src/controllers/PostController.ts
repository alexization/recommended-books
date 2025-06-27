import {PostServiceInterface} from "../services/interfaces/PostServiceInterface";
import {postService} from "../services/PostService";
import {Context} from "koa";
import {ResponseHandler} from "../utils/ResponseHandler";
import {CreatePostSchema, ParamsPostIdSchema, UpdatePostSchema} from "../validations/PostValidation";

export class PostController {

    private readonly postService: PostServiceInterface;

    constructor() {
        this.postService = postService;
    }

    createPost = async (ctx: Context): Promise<void> => {
        const postData = CreatePostSchema.parse(ctx.request.body);

        await this.postService.createPost(ctx.state.user, postData);

        ResponseHandler.success(ctx, '게시물을 성공적으로 등록했습니다.');
    };

    updatePost = async (ctx: Context): Promise<void> => {
        const postData = UpdatePostSchema.parse(ctx.request.body);

        await this.postService.updatePost(ctx.state.user, postData);

        ResponseHandler.success(ctx, "게시물을 성공적으로 수정했습니다.");
    }

    deletePost = async (ctx: Context): Promise<void> => {
        const postId = ParamsPostIdSchema.parse(ctx.params.postId);

        await this.postService.deletePost(ctx.state.user.id, postId);

        ResponseHandler.success(ctx, '게시물을 성공적으로 삭제했습니다.');
    }

    getPost = async (ctx: Context): Promise<void> => {
        const postId = ParamsPostIdSchema.parse(ctx.params.postId);

        const post = await this.postService.getPostById(postId);

        ResponseHandler.success(ctx, '게시물을 성공적으로 가져았습니다.', post);
    }
}

export const postController = new PostController();