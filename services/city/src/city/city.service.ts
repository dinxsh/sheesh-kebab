import { Injectable } from '@nestjs/common';

export interface Complaint {
    id: string;
    type: string;
    description: string;
    status: 'OPEN' | 'RESOLVED';
}

@Injectable()
export class CityService {
    private complaints: Complaint[] = [
        { id: '1', type: 'Pothole', description: 'Main street pothole', status: 'OPEN' },
        { id: '2', type: 'Garbage', description: 'Bin overflow', status: 'RESOLVED' },
    ];

    findAllComplaints() {
        return this.complaints;
    }

    fileComplaint(complaint: Omit<Complaint, 'id' | 'status'>) {
        const newComplaint: Complaint = {
            id: Math.random().toString(36).substr(2, 9),
            ...complaint,
            status: 'OPEN',
        };
        this.complaints.push(newComplaint);
        return newComplaint;
    }

    getUtilityStatus(id: string) {
        return { id, type: 'Water', status: 'Operational', lastChecked: new Date() };
    }
}
