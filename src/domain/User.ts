import {CreateUserData, UpdateUserData, UserData} from "./dto/UserDto";

export class User {
    public readonly id: number;
    public readonly email: string;
    public name: string;
    public birth: number;
    public readonly createdAt: string;
    public updatedAt: string;

    constructor(id: number, email: string, name: string, birth: number, updatedAt: string, createdAt: string);

    constructor(id: number, email: string, name: string, birth: number);

    constructor(id: number, email: string, name: string, birth: number, updatedAt?: string, createdAt?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.birth = birth;
        this.updatedAt = updatedAt ?? new Date().toISOString();
        this.createdAt = createdAt ?? new Date().toISOString();
    }

    static fromJson(userData: UserData): User {
        return new User(userData.id, userData.email, userData.name, userData.birth, userData.createdAt, userData.createdAt);
    }

    static create(id: number, createUserData: CreateUserData): User {
        return new User(id, createUserData.email, createUserData.name, createUserData.birth);
    }

    update(updateUserData: UpdateUserData): void {
        this.name = updateUserData.name;
        this.birth = updateUserData.birth;
        this.updatedAt = new Date().toISOString();
    }
}