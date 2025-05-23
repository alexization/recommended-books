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

    validate() {
        this.isValidEmail(this.email);
        this.isValidName(this.name);
    }

    isValidEmail(email) {
        if (email === null) {
            throw new AppError("이메일은 필수 입력 사항입니다.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidName(name) {
        if (name === null || name.length < 10) {
            throw new AppError("이름은 필수 입력 사항이며 10글자 이내여야 합니다.");
        }
    }
}