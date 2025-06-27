import {BookmarkServiceInterface} from "../services/interfaces/BookmarkServiceInterface";
import {bookmarkService} from "../services/BookmarkService";
import {Context} from "koa";
import {BookIdSchema} from "../validations/BookValidation";
import {ResponseHandler} from "../utils/ResponseHandler";


export class BookmarkController {
    private readonly bookmarkService: BookmarkServiceInterface;

    constructor() {
        this.bookmarkService = bookmarkService;
    }

    addBookmark = async (ctx: Context): Promise<void> => {
        const bookId = BookIdSchema.parse(ctx.params.bookId);

        await this.bookmarkService.addBookmark(ctx.state.user.id, bookId);

        ResponseHandler.success(ctx, "북마크를 성공적으로 등록했습니다.");
    };

    getBookmark = async (ctx: Context): Promise<void> => {
        const bookId = BookIdSchema.parse(ctx.params.bookId);

        const bookmark = await this.bookmarkService.getBookmark(ctx.state.user.id, bookId);

        ResponseHandler.success(ctx, "북마크를 성공적으로 가져왔습니다.", bookmark);
    }

    findBookmarksByUserId = async (ctx: Context): Promise<void> => {
        const page = BookIdSchema.parse(ctx.query.page);

        const bookmarks = await this.bookmarkService.findBookmarksByUserId(ctx.state.user.id, page);

        ResponseHandler.success(ctx, "사용자의 북마크 정보들을 성공적으로 가져왔습니다.", bookmarks);
    }

    removeBookmark = async (ctx: Context): Promise<void> => {
        const bookId = BookIdSchema.parse(ctx.params.bookId);

        await this.bookmarkService.removeBookmark(ctx.state.user.id, bookId);

        ResponseHandler.success(ctx, "북마크를 성공적으로 삭제했습니다.");
    }
}

export const bookmarkController = new BookmarkController();