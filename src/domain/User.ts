import {CreateUserData, UserData} from "./dto/UserDto";

export class User {
    public readonly id: number;
    public readonly email: string;
    public name: string;
    public birth: number;
    public readonly createdAt: string;
    public updatedAt: string;

    constructor(id: number, email: string, name: string, birth: number, updatedAt?: string, createdAt?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.birth = birth;
        this.updatedAt = updatedAt ? updatedAt : new Date().toISOString();
        this.createdAt = createdAt ? createdAt : new Date().toISOString();
    }

    toJSON(): UserData {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            birth: this.birth,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static create(id: number, createUserData: CreateUserData): User {
        return new User(id, createUserData.email, createUserData.name, createUserData.birth, undefined, undefined);
    }
}