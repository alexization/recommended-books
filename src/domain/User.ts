import {CreateUserData, UserData} from "./dto/UserDto";
import {Grade} from "./enums/Grade";
import bcrypt from 'bcryptjs';

export class User {
    private readonly _id: number;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _name: string;
    private readonly _birth: number;
    private readonly _grade: Grade;
    private readonly _updatedAt: Date;
    private readonly _createdAt: Date;

    constructor(id: number, email: string, password: string, name: string, birth: number, grade: Grade, updatedAt?: Date, createdAt?: Date) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._name = name;
        this._birth = birth;
        this._grade = grade;
        this._updatedAt = updatedAt ?? new Date();
        this._createdAt = createdAt ?? new Date();
    }

    get id(): number {
        return this._id
    }

    get email(): string {
        return this._email
    }

    get password(): string {
        return this._password
    }

    get name(): string {
        return this._name
    }

    get birth(): number {
        return this._birth
    }

    get grade(): Grade {
        return this._grade
    }

    get updatedAt(): Date {
        return this._updatedAt
    }

    get createdAt(): Date {
        return this._createdAt
    }

    static fromJson(userData: UserData): User {
        return new User(userData.userId, userData.email, userData.password, userData.name, userData.birth, userData.grade, userData.updatedAt, userData.createdAt);
    }

    static async create(id: number, createUserData: CreateUserData): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserData.password, 10);

        return new User(id, createUserData.email, hashedPassword, createUserData.name, createUserData.birth, Grade.BRONZE);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}