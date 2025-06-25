import {CreateUserData, UserData} from "./dto/UserDto.js";
import {Grade, GradeUtils} from "./enums/Grade.js";
import {Email} from "./valueObjects/Email";
import {Password} from "./valueObjects/Password";

export class User {
    private readonly _id: number;
    private readonly _email: Email;
    private readonly _password: Password;
    private readonly _name: string;
    private readonly _birth: number;
    private readonly _grade: Grade;
    private readonly _updatedAt: Date;
    private readonly _createdAt: Date;

    constructor(id: number, email: Email, password: Password, name: string, birth: number, grade: Grade, updatedAt: Date, createdAt: Date) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._name = name;
        this._birth = birth;
        this._grade = grade;
        this._updatedAt = updatedAt;
        this._createdAt = createdAt;
    }

    get id(): number {
        return this._id
    }

    get email(): Email {
        return this._email
    }

    get password(): Password {
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
        return new User(userData.user_id, new Email(userData.email), new Password(userData.password, true), userData.name, userData.birth, userData.grade, userData.updated_at, userData.created_at);
    }

    static async create(id: number, createUserData: CreateUserData): Promise<User> {
        const email = new Email(createUserData.email);
        const password = new Password(createUserData.password);
        const hashedPassword = await password.hash();

        return new User(id, email, hashedPassword, createUserData.name, createUserData.birth, Grade.BRONZE, new Date(), new Date());
    }

    async validatePassword(plainPassword: string): Promise<boolean> {
        return await this._password.matches(plainPassword);
    }

    isAvailableReservation(date: Date): boolean {
        const now = new Date();
        const preOrderDays = GradeUtils.convertPreOrderDays(this._grade);

        date.setDate(date.getDate() - preOrderDays);

        return now >= date;
    }

    expectedReturnDate(startDate: Date): Date {
        const loanPeriod = GradeUtils.loanPeriod(this._grade);

        const returnDate = startDate;
        returnDate.setDate(returnDate.getDate() + loanPeriod);

        return returnDate;
    }
}