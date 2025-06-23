import * as cron from 'node-cron';

export class CronService {

    private monthlyTask!: cron.ScheduledTask;

    constructor() {
        this.initializeMonthlyTask();
    }

    public start(): void {
        this.monthlyTask.start();
    }

    public stop(): void {
        this.monthlyTask.stop();
    }

    private initializeMonthlyTask(): void {
        this.monthlyTask = cron.schedule('0 0 1 * *', async () => {
            await this.calculateUserRating();
        });
    }

    private async calculateUserRating(): Promise<void> {

    }
}

export const cronService = new CronService();