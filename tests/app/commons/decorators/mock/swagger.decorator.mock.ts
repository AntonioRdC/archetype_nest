import { HttpStatus } from '@nestjs/common';

class TestTypeDto {
    exampleField: string;
}

const defaultOptions = {
    summary: 'Test summary',
    status: 200 as const,
    description: 'Test description',
    type: TestTypeDto,
};

const customErrors = [
    {
        status: HttpStatus.CONFLICT,
        description: 'Custom conflict error',
    },
    {
        status: HttpStatus.PRECONDITION_FAILED,
        description: 'Precondition failed error',
    },
];

const customErrorOptions = {
    ...defaultOptions,
    errors: customErrors,
};

const customErrorWithMergeErrorsOptions = {
    ...defaultOptions,
    errors: customErrors,
    mergeErrors: true,
};

const defaultErrors = [
    {
        status: HttpStatus.BAD_REQUEST,
        description:
            'Client specified an invalid argument, request body or query param',
    },
    {
        status: HttpStatus.UNAUTHORIZED,
        description: 'Client not authenticated',
    },
    {
        status: HttpStatus.FORBIDDEN,
        description:
            'Client does not have sufficient permissions to perform this action',
    },
    {
        status: HttpStatus.NOT_FOUND,
        description: 'A specified resource is not found',
    },
    {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal Server Error',
    },
    {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        description: 'Service unavailable',
    },
];

const defaultErrorsWithCustomErrors = [...defaultErrors, ...customErrors];

export {
    defaultOptions,
    customErrorOptions,
    defaultErrors,
    customErrorWithMergeErrorsOptions,
    defaultErrorsWithCustomErrors,
};
