import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionToken } from '@nestjs/mongoose';
import { HealthcheckService } from '@infra/modules/healthcheck/healthcheck.service';
import {
    MockConnection,
    mockStatusHealthcheckRes,
} from '../mock/healthcheck-mock';

describe('HealthcheckService', () => {
    let healthcheckService: HealthcheckService;
    let configService: ConfigService;
    let mockConnection: MockConnection;

    beforeEach(async () => {
        mockConnection = {
            db: {
                admin: jest.fn().mockReturnValue({
                    ping: jest.fn(),
                }),
            },
        };

        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            providers: [
                HealthcheckService,
                {
                    provide: getConnectionToken(),
                    useValue: mockConnection,
                },
            ],
        }).compile();

        healthcheckService = moduleRef.get(HealthcheckService);
        configService = moduleRef.get(ConfigService);
    });

    describe('status', () => {
        it('should return status when server is OK', async () => {
            jest.spyOn(configService, 'get').mockImplementation(
                (value: string) => {
                    if (value === 'app.name') {
                        return mockStatusHealthcheckRes.appName;
                    }
                    if (value === 'app.version') {
                        return mockStatusHealthcheckRes.appVersion;
                    }
                    return undefined;
                },
            );

            jest.spyOn(process, 'uptime').mockReturnValue(123.456);
            jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(
                '2024-01-01T00:00:00.000Z',
            );

            const result = await healthcheckService.status();

            expect(result.appName).toBe(mockStatusHealthcheckRes.appName);
            expect(result.appVersion).toBe(mockStatusHealthcheckRes.appVersion);
            expect(result.timestamp).toBe('2024-01-01T00:00:00.000Z');
            expect(result.uptime).toBe(123.456);
            expect(result.database).toBeDefined();
        });

        it('should return status with connected database', async () => {
            jest.spyOn(configService, 'get').mockImplementation(() => 'test');

            const result = await healthcheckService.status();

            expect(result.database.status).toBe('connected');
            expect(typeof result.database.latency).toBe('number');
        });

        it('should return status with disconnected database when ping fails', async () => {
            jest.spyOn(configService, 'get').mockImplementation(() => 'test');
            mockConnection.db
                .admin()
                .ping.mockRejectedValue(new Error('Connection failed'));

            const result = await healthcheckService.status();

            expect(result.database.status).toBe('disconnected');
            expect(typeof result.database.latency).toBe('number');
        });
    });
});
