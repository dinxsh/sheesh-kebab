import { Controller, All, Param, Req, Body, Res } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import type { Request, Response } from 'express';

@Controller('api')
export class GatewayController {
    constructor(private readonly gatewayService: GatewayService) { }

    @All(':service/*')
    async handleRequest(
        @Param('service') service: string,
        @Req() req: Request,
        @Body() body: any,
    ) {
        // Extract endpoint path after /api/:service
        // req.path is like /api/healthcare/appointments
        // We want /appointments
        const pathParts = req.path.split('/').slice(3); // remove '', 'api', 'service'
        const endpoint = pathParts.join('/');

        return this.gatewayService.proxyRequest(service, endpoint, req.method, body, req.headers);
    }
}
