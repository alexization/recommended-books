import * as cron from 'node-cron';
import {userRepository} from "../repositories/UserRepository";
import {Grade} from "../domain/enums/Grade";

export class CronService {
    private monthlyTask!: cron.ScheduledTask;

    constructor() {
        this.initializeMonthlyTask();
    }

    public start(): void {
        this.monthlyTask.start();
    }

    private initializeMonthlyTask(): void {
        this.monthlyTask = cron.schedule('0 0 1 * *', async () => {
            await this.assignmentUserGrade();
        });
    }

    private async assignmentUserGrade(): Promise<void> {
        const baseDate = this.buildBaseDate();
        const countOfPostsPerUsers = await userRepository.getCountOfPostsPerUserByMonth(baseDate);

        const goldUsers: number[] = [];
        const silverUsers: number[] = [];
        const bronzeUsers: number[] = [];

        countOfPostsPerUsers.map((user) => {
            const numberOfPosts = Number(user.number_of_posts);

            if (numberOfPosts >= 5) {
                goldUsers.push(user.user_id);
            } else if (numberOfPosts >= 2) {
                silverUsers.push(user.user_id);
            } else {
                bronzeUsers.push(user.user_id);
            }
        });

        const updatePromises = [];

        if (goldUsers.length > 0) {
            updatePromises.push(userRepository.updateUserGrade(goldUsers, Grade.GOLD));
        }
        if (silverUsers.length > 0) {
            updatePromises.push(userRepository.updateUserGrade(silverUsers, Grade.SILVER));
        }
        if (bronzeUsers.length > 0) {
            updatePromises.push(userRepository.updateUserGrade(bronzeUsers, Grade.BRONZE));
        }

        await Promise.all(updatePromises);
    }

    private buildBaseDate(): string {
        const now = new Date();
        let baseMonth: string;

        let month = now.getMonth() ? now.getMonth() : 12;
        if (month < 10) {
            baseMonth = '0' + month;
        } else {
            baseMonth = month.toString();
        }

        return `${now.getFullYear()}-${baseMonth}`;
    }
}

export const cronService = new CronService();