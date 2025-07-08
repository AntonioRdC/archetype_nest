import { Injectable } from '@nestjs/common';
import {
    DatabaseStatusResDto,
    StatusHealthcheckResDto,
} from './dtos/status-healthcheck-res.dto';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class HealthcheckService {
    constructor(
        private configService: ConfigService,
        @InjectConnection() private readonly connection: Connection,
    ) {}

    async status(): Promise<StatusHealthcheckResDto> {
        return {
            appName: this.configService.get('app.name'),
            appVersion: this.configService.get('app.version'),
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            database: await this.statusDatabase(),
        };
    }

    private async statusDatabase(): Promise<DatabaseStatusResDto> {
        const startTime = Date.now();
        try {
            await this.connection.db.admin().ping();
            return {
                status: 'connected',
                latency: Date.now() - startTime,
            };
        } catch {
            return {
                status: 'disconnected',
                latency: Date.now() - startTime,
            };
        }
    }
}
