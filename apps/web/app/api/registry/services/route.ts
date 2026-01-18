import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
    const db = readDB();
    return NextResponse.json(db.services);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = readDB();

        const newService = {
            id: (db.services.length + 1).toString(),
            name: body.name,
            region: body.region || 'National',
            status: 'Initializing',
            uptime: '0%',
            load: 'Low',
            type: 'Custom Node'
        };

        db.services.push(newService);
        writeDB(db);

        return NextResponse.json({ success: true, service: newService });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to register service' }, { status: 500 });
    }
}
