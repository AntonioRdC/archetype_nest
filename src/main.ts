import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import getConfiguration, { Configuration } from './config/config';

class App {
    app: INestApplication;
    swaggerConfig: Omit<OpenAPIObject, 'paths'>;

    private defaultConfig: Configuration;

    constructor() {
        this.defaultConfig = getConfiguration();
        this.startSetup();
    }

    async startSetup() {
        await this.bootstrap();
        this.swaggerSetup();
        await this.serverSetup();
    }

    async bootstrap() {
        this.app = await NestFactory.create(AppModule);
        this.app.enableCors();
        this.app.useGlobalPipes(new ValidationPipe());
        this.app.setGlobalPrefix(this.defaultConfig.app.prefix);
    }

    swaggerSetup() {
        this.swaggerConfig = new DocumentBuilder()
            .setTitle(this.defaultConfig.app.name)
            .setDescription(this.defaultConfig.app.description)
            .setVersion(this.defaultConfig.app.version)
            .addServer(this.defaultConfig.app.prefix)
            .build();
        const document = SwaggerModule.createDocument(
            this.app,
            this.swaggerConfig,
            {
                ignoreGlobalPrefix: true,
            },
        );
        fs.writeFileSync('./swagger.json', JSON.stringify(document));
        SwaggerModule.setup('api', this.app, document);
    }

    async serverSetup() {
        await this.app.listen(this.defaultConfig.app.port);
    }
}

export default new App();
