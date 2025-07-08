import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { HealthcheckController } from '@infra/modules/healthcheck/healthcheck.controller';
import { HealthcheckService } from '@infra/modules/healthcheck/healthcheck.service';
import { mockStatusHealthcheckRes } from '../mock/healthcheck-mock';

describe('HealthcheckController', () => {
    let healthcheckController: HealthcheckController;
    let healthcheckService: HealthcheckService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule],
            controllers: [HealthcheckController],
            providers: [
                {
                    provide: HealthcheckService,
                    useValue: {
                        status: jest.fn(),
                    },
                },
            ],
        }).compile();

        healthcheckService = moduleRef.get(HealthcheckService);
        healthcheckController = moduleRef.get(HealthcheckController);
    });

    describe('status', () => {
        it('should return status if Server is OK', async () => {
            jest.spyOn(healthcheckService, 'status').mockResolvedValue(
                mockStatusHealthcheckRes,
            );

            const result = await healthcheckController.status();

            expect(result).toBe(mockStatusHealthcheckRes);
        });
    });
});
