export class UserName {
    private readonly value: string;

    constructor(name: string) {
        this.value = name.toLowerCase().trim();
    }

    getValue(): string {
        return this.value;
    }

    equals(other: UserName): boolean {
        return this.value === other.value;
    }
}