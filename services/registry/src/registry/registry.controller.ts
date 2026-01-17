import { Controller, Get, Post, Body, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RegistryService } from './registry.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('registry')
export class RegistryController {
    constructor(private registryService: RegistryService) { }

    @Get('services')
    @UseInterceptors(CacheInterceptor)
    async getServices() {
        return this.registryService.getAllServices();
    }

    // Allow services to register themselves (could assume secured by API Key in real world)
    @Post('register')
    async register(@Body() body: Prisma.ServiceNodeCreateInput) {
        return this.registryService.registerService(body);
    }

    @Post('heartbeat/:id')
    async heartbeat(@Param('id') id: string) {
        return this.registryService.updateHeartbeat(id);
    }
}
