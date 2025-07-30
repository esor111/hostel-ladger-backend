import { DataSource } from 'typeorm';
export declare class AppService {
    private dataSource;
    constructor(dataSource: DataSource);
    getHello(): string;
    getHealthStatus(): Promise<{
        status: string;
        timestamp: string;
        database: {
            connected: boolean;
            type: "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "sap" | "oracle" | "cordova" | "nativescript" | "react-native" | "sqljs" | "mongodb" | "aurora-mysql" | "aurora-postgres" | "expo" | "better-sqlite3" | "capacitor" | "spanner";
            database: string | Uint8Array<ArrayBufferLike>;
            error?: undefined;
        };
        environment: string;
    } | {
        status: string;
        timestamp: string;
        database: {
            connected: boolean;
            error: any;
            type?: undefined;
            database?: undefined;
        };
        environment: string;
    }>;
}
