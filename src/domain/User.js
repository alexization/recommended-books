export class User {
    constructor(userData) {
        this.id = userData.id;
        this.email = userData.email;
        this.name = userData.name;
        this.birth = userData.birth;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
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
}