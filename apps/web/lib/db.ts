
import fs from 'fs';
import path from 'path';

// Define the shape of our DB
type Service = {
    id: string;
    name: string;
    status: string;
    uptime: string;
    load: string;
    region: string;
    type?: string;
};

type Alert = {
    active: boolean;
    type: string;
    zone: string;
    timestamp: string;
};

type DB = {
    services: Service[];
    alerts: Alert[];
    complaints: any[];
    appointments: any[];
    mandiRates: any[];
    schemes: any[];
};

const DB_PATH = path.join(process.cwd(), 'apps/web/data/db.json');

export function readDB(): DB {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Database Read Error:", error);
        // Return default structure if file missing/corrupt
        return { services: [], alerts: [], complaints: [], appointments: [], mandiRates: [], schemes: [] };
    }
}

export function writeDB(data: DB) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Database Write Error:", error);
    }
}
