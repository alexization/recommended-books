import dotenv from "dotenv";
import mariadb, {PoolConnection} from "mariadb";

dotenv.config();

export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export const databaseConfig: DatabaseConfig = {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!
};

type QueryParam = string | number | boolean | Date | null | undefined;

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private pool: mariadb.Pool;

    private constructor() {
        this.pool = mariadb.createPool({
            host: databaseConfig.host,
            port: databaseConfig.port,
            user: databaseConfig.user,
            password: databaseConfig.password,
            database: databaseConfig.database
        });
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public async executeQuery<T>(query: string, params?: QueryParam[]): Promise<T> {
        let connection: PoolConnection | undefined;

        try {
            connection = await this.pool.getConnection();
            const result = await connection.query(query, params);

            return result as T;

        } catch (error) {
            console.error("쿼리 실행 오류: ", error);
            throw error;
        } finally {
            if (connection) {
                await connection.release();
            }
        }
    }
}