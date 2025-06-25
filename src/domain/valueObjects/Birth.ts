export class Birth {
    private readonly value: number;

    constructor(birth: number) {
        this.value = birth;
    }

    getValue(): number {
        return this.value;
    }

    equals(other: Birth): boolean {
        return this.value === other.value;
    }
}