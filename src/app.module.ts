import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthcheckModule } from './infra/modules/healthcheck/healthcheck.module';
import configuration from './config/config';
import { DatabaseModule } from './infra/modules/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        HealthcheckModule,
    ],
})
export class AppModule {}
