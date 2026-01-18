
import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
    const db = readDB();
    return NextResponse.json(db.alerts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = readDB();

        const newAlert = {
            active: true,
            type: body.type,
            zone: body.zone,
            timestamp: new Date().toISOString()
        };

        db.alerts.push(newAlert);
        writeDB(db);

        return NextResponse.json({ success: true, alert: newAlert });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to broadcast alert' }, { status: 500 });
    }
}
