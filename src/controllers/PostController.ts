import {PostServiceInterface} from "../services/interfaces/PostServiceInterface";
import {postService} from "../services/PostService";
import {Context} from "koa";
import {ResponseHandler} from "../utils/ResponseHandler";
import {CreatePostSchema} from "../validations/PostValidation";

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
}

export const postController = new PostController();