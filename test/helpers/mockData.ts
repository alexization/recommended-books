import {CreateUserData, UserData} from "../../src/domain/dto/UserDto";
import {Grade} from "../../src/domain/enums/Grade";
import {CreatePostData, PostData} from "../../src/domain/dto/PostDto";

export const mockUserData: UserData = {
    user_id: 1,
    email: "test@example.com",
    password: "$2a$10$hashedpassword",
    name: "test name",
    birth: 2000,
    grade: Grade.BRONZE,
    created_at: new Date("2025-01-01"),
    updated_at: new Date("2025-02-01"),
}

export const mockCreateUserData: CreateUserData = {
    email: 'newUser@example.com', password: "testPassword", name: 'New User', birth: 2000,
}

export const mockPostData: PostData = {
    post_id: 1,
    user_id: 1,
    title: '객체지향의 사실과 오해',
    content: '정말 유익한 도서였습니다.',
    created_at: new Date("2025-01-01"),
    book_id: 1,
};

export const mockCreatePostData: CreatePostData = {
    title: '새로운 독후감 제목', content: '좋은 책을 읽었습니다.', bookId: 1,
}