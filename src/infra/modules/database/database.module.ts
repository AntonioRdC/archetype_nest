import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('mongodb.uri'),
                dbName: configService.get('mongodb.name'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
