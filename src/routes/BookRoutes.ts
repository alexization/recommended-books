import {Router} from "express";
import {bookController} from "../controllers/BookController";

const bookRouter = Router();

bookRouter.get('/books', bookController.getBooks);

export default bookRouter;