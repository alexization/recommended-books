import {CreateUserData, UserData} from "./dto/UserDto.js";
import {Grade, GradePolicy} from "./enums/Grade.js";
import {Email} from "./valueObjects/Email";
import {Password} from "./valueObjects/Password";
import {UserName} from "./valueObjects/UserName";
import {Birth} from "./valueObjects/Birth";

export class User {
    private readonly _id: number;
    private readonly _email: Email;
    private readonly _password: Password;
    private readonly _name: UserName;
    private readonly _birth: Birth;
    private readonly _grade: Grade;
    private readonly _updatedAt: Date;
    private readonly _createdAt: Date;

    constructor(id: number, email: Email, password: Password, name: UserName, birth: Birth, grade: Grade, updatedAt: Date, createdAt: Date) {
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

    get name(): UserName {
        return this._name
    }

    get birth(): Birth {
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
        return new User(userData.user_id, new Email(userData.email), new Password(userData.password), new UserName(userData.name), new Birth(userData.birth), userData.grade, userData.updated_at, userData.created_at);
    }

    static async create(id: number, createUserData: CreateUserData): Promise<User> {
        const email = new Email(createUserData.email);
        const password = new Password(createUserData.password);
        const hashedPassword = await password.hash();
        const name = new UserName(createUserData.name);
        const birth = new Birth(createUserData.birth);

        return new User(id, email, hashedPassword, name, birth, Grade.BRONZE, new Date(), new Date());
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