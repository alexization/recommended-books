import {Router} from '../utils/Routes';
import {bookController} from "../controllers/BookController";
import {BookRequest} from "../requests/BookRequest";
import {ServerResponse} from "http";

const bookRouter = new Router();

bookRouter.get('/books', async (req: BookRequest, res: ServerResponse): Promise<void> => {
    await bookController.getBooks(req, res);
});

export default bookRouter;