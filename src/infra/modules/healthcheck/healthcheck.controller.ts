import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusHealthcheckResDto } from './dtos/status-healthcheck-res.dto';

@Controller('healthcheck')
export class HealthcheckController {
    constructor(private readonly healthcheckService: HealthcheckService) {}

    @Get()
    @ApiOperation({ summary: 'Get application health status' })
    @ApiResponse({
        status: 200,
        description: 'Application health status',
        type: StatusHealthcheckResDto,
    })
    async status(): Promise<StatusHealthcheckResDto> {
        return await this.healthcheckService.status();
    }
}
