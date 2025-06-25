import {ValidationError} from "../../exception/AppError";
import {ErrorMessage} from "../../exception/ErrorMessage";
import bcrypt from "bcryptjs";

export class Password {
    private readonly value: string;

    constructor(password: string, isHashed: boolean = false) {
        if (!isHashed) {
            this.validatePassword(password);
        }
        this.value = password;
    }

    async hash(): Promise<Password> {
        const hashedValue = await bcrypt.hash(this.value, 10);
        return new Password(hashedValue, true);
    }

    async matches(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.value);
    }

    getValue(): string {
        return this.value;
    }

    private validatePassword(password: string) {
        if (!password) {
            throw new ValidationError(ErrorMessage.PASSWORD_REQUIRED);
        }

        if (password.length < 6 || password.length > 12) {
            throw new ValidationError(ErrorMessage.PASSWORD_INVALID_LENGTH);
        }
    }
}