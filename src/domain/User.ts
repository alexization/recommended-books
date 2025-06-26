import {CreateUserData, UserData} from "./dto/UserDto.js";
import {Grade, GradePolicy} from "./enums/Grade.js";
import {Password} from "./valueObjects/Password";
import {Birth} from "./valueObjects/Birth";

export class User {
    private readonly _id: number;
    private readonly _email: string;
    private _password: Password;
    private _name: string;
    private _birth: Birth;
    private readonly _grade: Grade;
    private _updatedAt: Date;
    private readonly _createdAt: Date;

    constructor(id: number, email: string, password: Password, name: string, birth: Birth, grade: Grade, updatedAt: Date, createdAt: Date) {
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

    get grade(): Grade {
        return this._grade
    }

    static fromJson(userData: UserData): User {
        return new User(userData.user_id, userData.email, new Password(userData.password), userData.name, new Birth(userData.birth), userData.grade, userData.updated_at, userData.created_at);
    }

    toPersistence() {
        return {
            user_id: this._id,
            email: this._email,
            password: this._password.getValue(),
            name: this._name,
            birth: this._birth.getValue(),
            grade: this._grade,
            updated_at: this._updatedAt,
            created_at: this._createdAt
        }
    }

    static async create(id: number, createUserData: CreateUserData): Promise<User> {
        const password = new Password(createUserData.password);
        const hashedPassword = await password.hash();

        const birth = new Birth(createUserData.birth);

        return new User(id, createUserData.email, hashedPassword, createUserData.name, birth, Grade.BRONZE, new Date(), new Date());
    }

    async changePassword(newPassword: string): Promise<void> {
        const password = new Password(newPassword);
        this._password = await password.hash();
        this._updatedAt = new Date();
    }

    updateProfile(name: string, birth: number): void {
        this._name = name;
        this._birth = new Birth(birth);
        this._updatedAt = new Date();
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

    getAge(): number {
        return this._birth.calculateAge();
    }
}