import {CreateUserData, UserData} from "./dto/UserDto.js";
import {Grade, GradePolicy} from "./enums/Grade.js";
import {Password} from "./valueObjects/Password";

export class User {
    private readonly _id: number;
    private readonly _email: string;
    private readonly _password: Password;
    private readonly _name: string;
    private readonly _birth: number;
    private readonly _grade: Grade;
    private readonly _updatedAt: Date;
    private readonly _createdAt: Date;

    constructor(id: number, email: string, password: Password, name: string, birth: number, grade: Grade, updatedAt: Date, createdAt: Date) {
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

    get email(): string {
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
        return new User(userData.user_id, userData.email, new Password(userData.password), userData.name, userData.birth, userData.grade, userData.updated_at, userData.created_at);
    }

    static async create(id: number, createUserData: CreateUserData): Promise<User> {
        const password = new Password(createUserData.password);
        const hashedPassword = await password.hash();

        return new User(id, createUserData.email, hashedPassword, createUserData.name, createUserData.birth, Grade.BRONZE, new Date(), new Date());
    }

    async validatePassword(plainPassword: string): Promise<boolean> {
        return await this._password.matches(plainPassword);
    }

    canReserveBookForDate(targetDate: Date): boolean {
        const gradePolicy = new GradePolicy();
        const preOrderDays = gradePolicy.getPreOrderDays(this._grade);

        const now = new Date();
        const adjustDate = new Date(targetDate);

        adjustDate.setDate(adjustDate.getDate() - preOrderDays);

        return now >= adjustDate;
    }

    calculateExpectedReturnDate(loanStartDate: Date): Date {
        const gradePolicy = new GradePolicy();
        const loanPeriod = gradePolicy.getLoanPeriod(this._grade);

        const returnDate = new Date(loanStartDate);
        returnDate.setDate(returnDate.getDate() + loanPeriod);

        return returnDate;
    }
}