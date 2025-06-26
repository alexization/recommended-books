export interface PostData {
    postId: number;
    userId: number;
    title: string;
    content: string;
    createdAt: Date;
    bookId?: number;
    imagePath?: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      CreatePostData:
 *          type: object
 *          required:
 *              - title
 *              - content
 *          properties:
 *              title:
 *                  type: string
 *                  example: "무지개 물고기 독후감"
 *              content:
 *                  type: string
 *                  example: "무지개 물고기 독후감 내용을 적습니다."
 *              bookId:
 *                  type: integer
 *                  example: 1
 *              imageBase64:
 *                  type: string
 * */
export interface CreatePostData {
    title: string;
    content: string;
    bookId?: number;
    imageBase64?: string;
}

export interface UpdatePostData {
    postId: number;
    title: string;
    content: string;
    imageBase64?: string;
}