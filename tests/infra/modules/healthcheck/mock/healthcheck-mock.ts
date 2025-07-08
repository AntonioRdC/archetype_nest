import {
    StatusHealthcheckResDto,
    DatabaseStatusResDto,
} from '@infra/modules/healthcheck/dtos/status-healthcheck-res.dto';

export const mockDatabaseStatus: DatabaseStatusResDto = {
    status: 'connected',
    latency: 50,
};

export const mockStatusHealthcheckRes: StatusHealthcheckResDto = {
    appName: 'test-app',
    appVersion: '1.0.0',
    timestamp: '2024-01-01T00:00:00.000Z',
    uptime: 123.456,
    database: mockDatabaseStatus,
};

export interface MockConnection {
    db: {
        admin: () => {
            ping: jest.Mock;
        };
    };
}
