
import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
    const db = readDB();
    // Return empty array if not found, to be safe
    return NextResponse.json(db.mandiRates || []);
}
