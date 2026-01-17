import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthcareModule } from './healthcare/healthcare.module';

@Module({
  imports: [HealthcareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
