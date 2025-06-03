import {Router} from '../utils/Routes.ts';
import {bookController} from "../controllers/BookController.ts";

const bookRouter = new Router();

bookRouter.get('/books', async (req, res) => {
    await bookController.getBooks(req, res);
})

export default bookRouter;