import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ServiceStatus, ServiceType } from '@prisma/client';

@Injectable()
export class RegistryService {
    constructor(private prisma: PrismaService) { }

    async registerService(data: Prisma.ServiceNodeCreateInput) {
        // Check if exists by name/url (optional logic)
        return this.prisma.serviceNode.create({ data });
    }

    async getAllServices() {
        return this.prisma.serviceNode.findMany({
            where: { status: { not: ServiceStatus.DOWN } },
            orderBy: { name: 'asc' },
        });
    }

    async updateHeartbeat(id: string) {
        return this.prisma.serviceNode.update({
            where: { id },
            data: { status: ServiceStatus.ACTIVE, updatedAt: new Date() },
        });
    }
}
