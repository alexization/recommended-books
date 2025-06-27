import Router from "@koa/router";
import {commentController} from "../controllers/CommentController";

const commentRoutes = new Router({
    prefix: '/comments'
})

commentRoutes.post("/", commentController.createComment);

commentRoutes.put("/", commentController.updateComment);

commentRoutes.delete("/:commentId", commentController.deleteComment);

commentRoutes.get("/", commentController.findCommentsByPostId);

export default commentRoutes;