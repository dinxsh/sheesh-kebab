import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GatewayService {
    constructor(private readonly httpService: HttpService) { }

    private services: Record<string, string> = {
        registry: 'http://localhost:3001',
        healthcare: 'http://localhost:3002',
        agriculture: 'http://localhost:3003',
        city: 'http://localhost:3004',
    };

    async proxyRequest(service: string, endpoint: string, method: string, data?: any, headers?: any) {
        const baseUrl = this.services[service];
        if (!baseUrl) {
            throw new HttpException('Service not found', 404);
        }

        const url = `${baseUrl}/${endpoint}`;

        // Filter headers (remove host, connection, etc. if needed)
        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: { ...headers, host: undefined },
        };

        try {
            const response = await lastValueFrom(this.httpService.request(config));
            return response.data;
        } catch (error) {
            // Forward error response
            if (error.response) {
                throw new HttpException(error.response.data, error.response.status);
            }
            throw new HttpException('Service Unavailable', 503);
        }
    }
}
