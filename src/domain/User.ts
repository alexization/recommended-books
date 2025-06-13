import bcrypt from 'bcryptjs';
import {CreateUserData, UpdateUserData, UserData} from "./dto/UserDto";

export class User {
    public readonly id: number;
    public readonly email: string;
    public password: string;
    public name: string;
    public birth: number;
    public updatedAt: Date;
    public readonly createdAt: Date;

    constructor(id: number, email: string, password: string, name: string, birth: number, updatedAt?: Date, createdAt?: Date) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.updatedAt = updatedAt ?? new Date();
        this.createdAt = createdAt ?? new Date();
    }

    static fromJson(userData: UserData): User {
        return new User(userData.id, userData.email, userData.password, userData.name, userData.birth, userData.updatedAt, userData.createdAt);
    }

    static async create(id: number, createUserData: CreateUserData): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserData.password, 10);

        return new User(id, createUserData.email, hashedPassword, createUserData.name, createUserData.birth);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    update(updateUserData: UpdateUserData): void {
        this.name = updateUserData.name;
        this.birth = updateUserData.birth;
        this.updatedAt = new Date();
    }
}