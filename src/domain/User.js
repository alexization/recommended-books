import {AppError} from "../utils/AppError.js";

export class User {
    constructor(userData) {
        this.id = userData.id;
        this.email = userData.email;
        this.name = userData.name;
        this.birth = userData.birth;
        this.createdAt = userData.createdAt;
        this.updatedAt = userData.updatedAt;

        this.validate();
    }

    static fromJSON(userData) {
        return new User(userData);
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            birth: this.birth,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    validate() {
        this.isValidEmail(this.email);
        this.isValidName(this.name);
    }

    isValidEmail(email) {
        if (!email || email.trim() === '') {
            throw new AppError("이메일은 필수 입력 사항입니다.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError("올바른 이메일 형식이 아닙니다.");
        }
    }

    isValidName(name) {
        if (!name || name.trim() === '') {
            throw new AppError("이름은 필수 입력 사항입니다.");
        }
        if (name.length > 10) {
            throw new AppError("이름은10글자 이내여야 합니다.");
        }
    }
}