import bcrypt from "bcryptjs";

export class Password {
    private readonly value: string;

    constructor(password: string) {
        this.value = password;
    }

    async hash(): Promise<Password> {
        const hashedValue = await bcrypt.hash(this.value, 10);

        return new Password(hashedValue);
    }

    async matches(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.value);
    }

    getValue(): string {
        return this.value;
    }
}