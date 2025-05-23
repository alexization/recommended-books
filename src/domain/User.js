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
            throw new Error("이메일은 필수입니다!");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidName(name) {
        if (name === null || name.length < 10) {
            throw new Error("유효하지 않는 이름입니다.");
        }
    }
}