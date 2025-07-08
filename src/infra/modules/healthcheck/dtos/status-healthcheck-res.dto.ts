import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject } from 'class-validator';

export class DatabaseStatusResDto {
    @ApiProperty()
    @IsString()
    status: string;

    @ApiProperty()
    @IsNumber()
    latency: number;
}

export class StatusHealthcheckResDto {
    @ApiProperty()
    @IsString()
    appName: string;

    @ApiProperty()
    @IsString()
    appVersion: string;

    @ApiProperty()
    @IsString()
    timestamp: string;

    @ApiProperty()
    @IsNumber()
    uptime: number;

    @ApiProperty()
    @IsObject()
    database: DatabaseStatusResDto;
}
