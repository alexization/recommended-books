import bcrypt from "bcryptjs";

export class Password {
    private readonly _value: string;

    constructor(password: string) {
        this._value = password;
    }

    async hash(): Promise<Password> {
        const hashedValue = await bcrypt.hash(this._value, 10);

        return new Password(hashedValue);
    }

    async matches(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this._value);
    }

    getValue(): string {
        return this._value;
    }
}