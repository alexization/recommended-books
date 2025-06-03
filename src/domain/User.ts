export interface UserData {
    id: number;
    email: string;
    name: string;
    birth: number;
    createdAt: string;
    updatedAt: string;
}

export class User {
    public readonly id: number;
    public readonly email: string;
    public name: string;
    public birth: number;
    public readonly createdAt: string;
    public updatedAt: string;

    constructor(userData: UserData) {
        this.id = userData.id;
        this.email = userData.email;
        this.name = userData.name;
        this.birth = userData.birth;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    static fromJSON(userData: UserData) {
        return new User(userData);
    }

    toJSON(): UserData {
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