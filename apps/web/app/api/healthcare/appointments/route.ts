
import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
    const db = readDB();
    return NextResponse.json(db.appointments);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = readDB();

        const newAppointment = {
            id: db.appointments.length + 1,
            doctor: body.doctor,
            hospital: body.hospital,
            date: body.date,
            time: body.time,
            status: 'Scheduled'
        };

        db.appointments.unshift(newAppointment);
        writeDB(db);

        return NextResponse.json({ success: true, appointment: newAppointment });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
    }
}
