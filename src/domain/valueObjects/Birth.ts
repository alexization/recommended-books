export class Birth {
    private readonly value: number;

    constructor(birth: number) {
        this.value = birth;
    }

    calculateAge(): number {
        return new Date().getFullYear() - this.value;
    }

    getValue(): number {
        return this.value;
    }
}