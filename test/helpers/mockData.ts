import {CreateUserData, UserData} from "../../src/domain/dto/UserDto";
import {Grade} from "../../src/domain/enums/Grade";

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