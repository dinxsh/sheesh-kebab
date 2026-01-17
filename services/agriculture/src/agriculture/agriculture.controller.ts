import { Controller, Get, Query } from '@nestjs/common';
import { AgricultureService } from './agriculture.service';

@Controller('agriculture')
export class AgricultureController {
    constructor(private readonly agriService: AgricultureService) { }

    @Get('schemes')
    getSchemes() {
        return this.agriService.findAllSchemes();
    }

    @Get('advisory')
    getAdvisory(@Query('crop') crop: string) {
        return this.agriService.getAdvisory(crop || 'wheat');
    }
}
