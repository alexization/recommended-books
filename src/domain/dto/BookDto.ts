export interface BookData {
    book_id: number,
    title: string,
    author: string,
    publisher: string,
    publication_year: number,
    created_at: Date,
}

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateBookData:
 *          type: object
 *          required:
 *              - title
 *              - author
 *              - publisher
 *              - publicationYear
 *          properties:
 *              title:
 *                  type: string
 *                  example: "test book title"
 *              author:
 *                  type: string
 *                  example: "authorA"
 *              publisher:
 *                  type: string
 *                  example: "PublisherA"
 *              publicationYear:
 *                  type: integer
 *                  example: 2000
 * */
export interface CreateBookData {
    title: string,
    author: string,
    publisher: string,
    publicationYear: number
}

export interface OpenApiBookJson {
    bk_nm: string;
    aut_nm: string;
    pblshr: string;
    loan_yn: string;
    rtn_ed: string;
}

export interface OpenApiBookData {
    title: string;
    author: string;
    publisher: string;
    loanStatus: boolean;
    returnDate: Date;
}