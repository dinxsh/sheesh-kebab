import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CityService, Complaint } from './city.service';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get('complaints')
    getComplaints() {
        return this.cityService.findAllComplaints();
    }

    @Post('complaints')
    fileComplaint(@Body() body: Omit<Complaint, 'id' | 'status'>) {
        return this.cityService.fileComplaint(body);
    }

    @Get('utilities/:id')
    getUtility(@Param('id') id: string) {
        return this.cityService.getUtilityStatus(id);
    }
}
