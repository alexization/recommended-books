export enum Grade {
    BRONZE = 'BRONZE', SILVER = 'SILVER', GOLD = 'GOLD'
}

export class GradeUtils {

    static convertPreOrderDays(grade: Grade): number {
        let preOrderDays: number = 3;

        if (grade === Grade.GOLD) {
            preOrderDays = 7;
        } else if (grade === Grade.SILVER) {
            preOrderDays = 5;
        }

        return preOrderDays;
    }

    static loanPeriod(grade: Grade): number {
        let loanPeriod: number = 14;

        if (grade === Grade.GOLD) {
            loanPeriod = 28;
        } else if (grade === Grade.SILVER) {
            loanPeriod = 21;
        }

        return loanPeriod;
    }
}