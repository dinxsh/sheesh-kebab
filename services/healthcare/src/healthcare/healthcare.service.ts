import { Injectable, NotFoundException } from '@nestjs/common';

export interface Appointment {
    id: string;
    patientName: string;
    doctorName: string;
    date: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

@Injectable()
export class HealthcareService {
    private appointments: Appointment[] = [
        { id: '1', patientName: 'John Doe', doctorName: 'Dr. House', date: '2026-02-20T10:00:00Z', status: 'SCHEDULED' },
        { id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Grey', date: '2026-02-21T14:00:00Z', status: 'COMPLETED' },
    ];

    findAll() {
        return this.appointments;
    }

    findOne(id: string) {
        const appointment = this.appointments.find((a) => a.id === id);
        if (!appointment) throw new NotFoundException('Appointment not found');
        return appointment;
    }

    create(appointment: Omit<Appointment, 'id'>) {
        const newAppointment = { id: Math.random().toString(36).substr(2, 9), ...appointment };
        this.appointments.push(newAppointment);
        return newAppointment;
    }
}
