import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GlobalExceptionFilter } from '@app/commons/exceptions/http-exception.filter';

describe('GlobalExceptionFilter', () => {
    let filter: GlobalExceptionFilter;
    let mockResponse: Partial<Response>;
    let mockArgumentsHost: Partial<ArgumentsHost>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GlobalExceptionFilter],
        }).compile();

        filter = module.get<GlobalExceptionFilter>(GlobalExceptionFilter);

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        mockArgumentsHost = {
            switchToHttp: jest.fn().mockReturnValue({
                getResponse: jest.fn().mockReturnValue(mockResponse),
            }),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('catch', () => {
        it('should handle HttpException correctly', () => {
            const status = HttpStatus.BAD_REQUEST;
            const message = 'Bad Request';
            const httpException = new HttpException(message, status);

            filter.catch(httpException, mockArgumentsHost as ArgumentsHost);

            expect(mockArgumentsHost.switchToHttp).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(status);
            expect(mockResponse.json).toHaveBeenCalledWith({
                statusCode: status,
                error: message,
            });
        });

        it('should handle HttpException with object response', () => {
            const status = HttpStatus.UNPROCESSABLE_ENTITY;
            const responseObject = {
                message: ['email must be a valid email'],
                error: 'Unprocessable Entity',
                statusCode: 422,
            };
            const httpException = new HttpException(responseObject, status);

            filter.catch(httpException, mockArgumentsHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(status);
            expect(mockResponse.json).toHaveBeenCalledWith({
                statusCode: status,
                error: responseObject,
            });
        });

        it('should handle non-HttpException as internal server error', () => {
            const genericError = new Error('Something went wrong');

            filter.catch(genericError, mockArgumentsHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal server error',
            });
        });

        it('should handle unknown exception as internal server error', () => {
            const unknownException = null;

            filter.catch(unknownException, mockArgumentsHost as ArgumentsHost);

            expect(mockResponse.status).toHaveBeenCalledWith(
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal server error',
            });
        });

        it('should handle HttpException with different status codes', () => {
            const testCases = [
                { status: HttpStatus.NOT_FOUND, message: 'Not Found' },
                { status: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' },
                { status: HttpStatus.FORBIDDEN, message: 'Forbidden' },
                { status: HttpStatus.CONFLICT, message: 'Conflict' },
            ];

            testCases.forEach(({ status, message }) => {
                const httpException = new HttpException(message, status);

                filter.catch(httpException, mockArgumentsHost as ArgumentsHost);

                expect(mockResponse.status).toHaveBeenCalledWith(status);
                expect(mockResponse.json).toHaveBeenCalledWith({
                    statusCode: status,
                    error: message,
                });
            });
        });
    });
});
