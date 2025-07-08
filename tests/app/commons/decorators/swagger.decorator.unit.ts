import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
    customErrorOptions,
    customErrorWithMergeErrorsOptions,
    defaultErrors,
    defaultErrorsWithCustomErrors,
    defaultOptions,
} from './mock/swagger.decorator.mock';
import { Swagger } from '@/app/commons/decorators/swagger.decorator';

jest.mock('@nestjs/swagger', () => ({
    ApiOperation: jest.fn(() => jest.fn()),
    ApiResponse: jest.fn(() => jest.fn()),
}));

describe('SwaggerDecorator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should apply the correct decorators with default errors', () => {
        const decorators = Swagger(defaultOptions);

        expect(ApiOperation).toHaveBeenCalledWith({
            summary: defaultOptions.summary,
        });
        expect(ApiResponse).toHaveBeenCalledWith({
            status: defaultOptions.status,
            description: defaultOptions.description,
            type: defaultOptions.type,
        });
        defaultErrors.forEach((err) => {
            expect(ApiResponse).toHaveBeenCalledWith({
                status: err.status,
                description: err.description,
            });
        });
        expect(decorators).toBeDefined();
    });

    it('should apply the correct decorators with custom errors', () => {
        const decorators = Swagger(customErrorOptions);

        expect(ApiOperation).toHaveBeenCalledWith({
            summary: customErrorOptions.summary,
        });
        expect(ApiResponse).toHaveBeenCalledWith({
            status: customErrorOptions.status,
            description: customErrorOptions.description,
            type: customErrorOptions.type,
        });
        customErrorOptions.errors.forEach((err) => {
            expect(ApiResponse).toHaveBeenCalledWith({
                status: err.status,
                description: err.description,
            });
        });
        expect(decorators).toBeDefined();
    });

    it('should apply the correct decorators with custom errors and mergeErrors true', () => {
        const decorators = Swagger(customErrorWithMergeErrorsOptions);

        expect(ApiOperation).toHaveBeenCalledWith({
            summary: customErrorWithMergeErrorsOptions.summary,
        });
        expect(ApiResponse).toHaveBeenCalledWith({
            status: customErrorWithMergeErrorsOptions.status,
            description: customErrorWithMergeErrorsOptions.description,
            type: customErrorWithMergeErrorsOptions.type,
        });
        defaultErrorsWithCustomErrors.forEach((err) => {
            expect(ApiResponse).toHaveBeenCalledWith({
                status: err.status,
                description: err.description,
            });
        });
        expect(decorators).toBeDefined();
    });
});
