import {ValidationError} from "../../exception/AppError";
import {ErrorMessage} from "../../exception/ErrorMessage";

export class Email {
    private readonly value: string;

    constructor(email: string) {
        this.validateEmail(email);
        this.value = email.toLowerCase().trim();
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Email): boolean {
        return this.value === other.value;
    }

    private validateEmail(email: string) {
        if (!email) {
            throw new ValidationError(ErrorMessage.EMAIL_REQUIRED);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError(ErrorMessage.EMAIL_INVALID_FORMAT);
        }
    }
}