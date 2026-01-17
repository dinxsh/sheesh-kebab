import { Module } from '@nestjs/common';
import { AgricultureService } from './agriculture.service';
import { AgricultureController } from './agriculture.controller';

@Module({
    controllers: [AgricultureController],
    providers: [AgricultureService],
})
export class AgricultureModule { }
