import { Injectable } from '@nestjs/common';

export interface Scheme {
    id: string;
    name: string;
    description: string;
    eligibility: string;
}

@Injectable()
export class AgricultureService {
    private schemes: Scheme[] = [
        { id: '1', name: 'PM-KISAN', description: 'Income support for farmers', eligibility: 'Small landholders' },
        { id: '2', name: 'Kisan Credit Card', description: 'Credit suppport', eligibility: 'All farmers' },
    ];

    findAllSchemes() {
        return this.schemes;
    }

    getAdvisory(crop: string) {
        const advisories: Record<string, string> = {
            wheat: 'Sow in November. Use ample nitrogen.',
            rice: 'Maintain water level. Watch for leaf folder.',
        };
        return { crop, message: advisories[crop.toLowerCase()] || 'No specific advisory available.' };
    }
}
