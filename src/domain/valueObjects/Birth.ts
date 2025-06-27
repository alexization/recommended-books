export class Birth {
    private readonly _value: number;

    constructor(birth: number) {
        this._value = birth;
    }

    calculateAge(): number {
        return new Date().getFullYear() - this._value;
    }

    getValue(): number {
        return this._value;
    }
}