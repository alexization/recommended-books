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
}