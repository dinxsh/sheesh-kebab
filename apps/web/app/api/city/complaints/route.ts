
import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
    const db = readDB();
    return NextResponse.json(db.complaints);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = readDB();

        const newComplaint = {
            id: body.id || `AMC-2026-${Math.floor(Math.random() * 1000) + 1000}`,
            type: body.type,
            loc: body.loc,
            zone: body.zone,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        };

        db.complaints.unshift(newComplaint); // Add to top
        writeDB(db);

        return NextResponse.json({ success: true, complaint: newComplaint });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to submit complaint' }, { status: 500 });
    }
}
