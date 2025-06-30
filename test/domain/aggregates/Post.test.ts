import {mockCreatePostData, mockPostData} from "../../helpers/mockData";
import {Post} from "../../../src/domain/aggregates/Post";
import {UpdatePostData} from "../../../src/domain/dto/PostDto";
import {AppError} from "../../../src/exception/AppError";
import {ErrorMessage} from "../../../src/exception/ErrorMessage";

describe('Post Aggregate', () => {

    describe('create', () => {
        it('새로운 게시글을 생성해야 한다.', () => {
            /* given */
            const userId = 1;
            const postData = {...mockCreatePostData};

            /* when */
            const post = Post.create(userId, postData);

            /* then*/
            expect(post).toBeDefined();
            expect(post.userId).toBe(userId);
            expect(post.toPersistence().title).toBe(postData.title);

        });

        it('이미지 경로와 함께 게시글을 생성해야 한다.', () => {
            /* given */
            const userId = 1;
            const postData = {...mockCreatePostData};
            const imagePath = '/uploads/images/test.jpg';

            /* when */
            const post = Post.create(userId, postData, imagePath);

            /* then*/
            expect(post.toPersistence().image_path).toBe(imagePath);

        });
    });

    describe('canBeDeletedBy', () => {
        it('작성자는 삭제 권한이 있어야 한다.', () => {
            /* given */
            const post = Post.fromJson(mockPostData);
            const ownerId = mockPostData.user_id;

            /* when */
            const canDelete = post.canBeDeletedBy(ownerId);

            /* then*/
            expect(canDelete).toBe(true);

        });

        it('작성자가 아니면 삭제 권한이 없어야 한다.', () => {
            /* given */
            const post = Post.fromJson(mockPostData);
            const ownerId = 999;

            /* when */
            const canDelete = post.canBeDeletedBy(ownerId);

            /* then*/
            expect(canDelete).toBe(false);

        });
    });

    describe('update', () => {
        it('작성자는 게시글을 수정할 수 있어야 한다.', () => {
            /* given */
            const post = Post.fromJson(mockPostData);
            const authorId = mockPostData.user_id;
            const updateData: UpdatePostData = {
                postId: mockPostData.post_id, title: '수정된 제목', content: '수정된 내용'
            };

            /* when */
            post.update(authorId, updateData);

            /* then*/
            const persistence = post.toPersistence();
            expect(persistence.title).toBe(updateData.title);
            expect(persistence.content).toBe(updateData.content);

        });

        it('작성자가 아니면 게시물을 수정할 수 없어야 한다.', () => {
            /* given */
            const post = Post.fromJson(mockPostData);
            const otherUserId = 999;
            const updateData: UpdatePostData = {
                postId: mockPostData.post_id, title: '수정된 제목', content: '수정된 내용'
            };

            /* when & then */
            expect(() => {
                post.update(otherUserId, updateData);
            }).toThrow(ErrorMessage.POST_OWNER_INVALID.message);
        });
    });
});