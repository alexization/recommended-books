import {AppError} from "../../exception/AppError";
import {ErrorMessage} from "../../exception/ErrorMessage";

export enum Grade {
    BRONZE = 'BRONZE', SILVER = 'SILVER', GOLD = 'GOLD'
}

export class GradePolicy {

    private readonly policies: Map<Grade, GradeInfo> = new Map([
        [Grade.BRONZE, {preOrderDays: 3, loanPeriod: 14}],
        [Grade.SILVER, {preOrderDays: 5, loanPeriod: 21}],
        [Grade.GOLD, {preOrderDays: 7, loanPeriod: 28}],
    ])

    getPreOrderDays(grade: Grade): number {
        const policy = this.policies.get(grade);
        if (!policy) {
            throw new AppError(ErrorMessage.GRADE_UNDEFINED);
        }

        return policy.preOrderDays;
    }

    getLoanPeriod(grade: Grade): number {
        const policy = this.policies.get(grade);
        if (!policy) {
            throw new AppError(ErrorMessage.GRADE_UNDEFINED);
        }

        return policy.loanPeriod;
    }
}

export interface GradeInfo {
    preOrderDays: number;
    loanPeriod: number;
}