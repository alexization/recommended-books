import bcrypt from 'bcryptjs';
import {CreateUserData, UserData} from "./dto/UserDto";

export class User {
    private readonly id: number;
    private readonly email: string;
    private readonly password: string;
    private name: string;
    private birth: number;
    private updatedAt: Date;
    private readonly createdAt: Date;

    constructor(id: number, email: string, password: string, name: string, birth: number, updatedAt?: Date, createdAt?: Date) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.updatedAt = updatedAt ?? new Date();
        this.createdAt = createdAt ?? new Date();
    }

    get getId(): number {
        return this.id
    }

    get getEmail(): string {
        return this.email
    }

    get getPassword(): string {
        return this.password
    }

    get getName(): string {
        return this.name
    }

    get getBirth(): number {
        return this.birth
    }

    get getUpdatedAt(): Date {
        return this.updatedAt
    }

    get getCreatedAt(): Date {
        return this.createdAt
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
}