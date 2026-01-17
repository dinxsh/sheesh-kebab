import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HealthcareService, Appointment } from './healthcare.service';

@Controller('appointments')
export class HealthcareController {
    constructor(private readonly healthcareService: HealthcareService) { }

    @Get()
    findAll() {
        return this.healthcareService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.healthcareService.findOne(id);
    }

    @Post()
    create(@Body() createAppointmentDto: Omit<Appointment, 'id'>) {
        return this.healthcareService.create(createAppointmentDto);
    }
}
