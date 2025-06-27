import Router from "@koa/router";
import {bookmarkController} from "../controllers/BookmarkController";

const bookmarkRoutes = new Router({
    prefix: "/bookmarks"
});

bookmarkRoutes.post('/', bookmarkController.addBookmark);

bookmarkRoutes.get('/:bookId', bookmarkController.getBookmark);

bookmarkRoutes.get('/', bookmarkController.findBookmarksByUserId);

bookmarkRoutes.delete('/', bookmarkController.removeBookmark);

export default bookmarkRoutes;