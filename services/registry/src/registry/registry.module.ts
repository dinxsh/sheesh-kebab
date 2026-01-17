import { Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { PrismaModule } from '../prisma/prisma.module';

import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
    imports: [
        PrismaModule,
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: await redisStore({
                    socket: {
                        host: process.env.REDIS_HOST || 'localhost',
                        port: parseInt(process.env.REDIS_PORT || '6379'),
                    },
                    ttl: 60 * 1000, // 1 minute cache
                }),
            }),
        }),
    ],
    controllers: [RegistryController],
    providers: [RegistryService],
})
export class RegistryModule { }
