import {CommentServiceInterface} from "../services/interfaces/CommentServiceInterface";
import {commentSerivce} from "../services/CommentService";
import {Context} from "koa";
import {ResponseHandler} from "../utils/ResponseHandler";
import {CommentIdSchema, CreateCommentSchema, UpdateCommentSchema} from "../validations/CommentValidation";

export class CommentController {
    private readonly commentService: CommentServiceInterface;

    constructor() {
        this.commentService = commentSerivce;
    }

    createComment = async (ctx: Context): Promise<void> => {
        const {postId, content} = CreateCommentSchema.parse(ctx.request.body);

        await this.commentService.createComment(postId, ctx.state.user.id, content);

        ResponseHandler.success(ctx, "성공적으로 댓글을 등록했습니다.");
    };

    updateComment = async (ctx: Context): Promise<void> => {
        const updateCommentData = UpdateCommentSchema.parse(ctx.request.body);

        await this.commentService.updateComment(ctx.state.user.id, updateCommentData);

        ResponseHandler.success(ctx, "성공적으로 댓글을 수정했습니다.");
    }

    deleteComment = async (ctx: Context): Promise<void> => {
        const commentId = CommentIdSchema.parse(ctx.params.commentId);

        await this.commentService.deleteComment(commentId, ctx.state.user.id);

        ResponseHandler.success(ctx, "성공적으로 댓글을 삭제했습니다.");
    }

    findCommentsByPostId = async (ctx: Context): Promise<void> => {
        const postId = CommentIdSchema.parse(ctx.query.postId);
        const page = CommentIdSchema.parse(ctx.query.page);

        const comments = await this.commentService.findCommentsByPostId(postId, page);

        ResponseHandler.success(ctx, "성공적으로 댓글들을 가져왔습니다.", comments);
    }
}

export const commentController = new CommentController();