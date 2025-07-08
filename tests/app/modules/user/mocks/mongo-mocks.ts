import { UserEntity } from '@/app/modules/user/entities/user.entity';
import { UserService } from '@/app/modules/user/user.service';
import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

export const mockUserEntities = [
    {
        _id: '123abc456def',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        age: 30,
        createdAt: new Date('2022-01-01T00:00:00.000Z'),
        updatedAt: new Date('2022-01-01T00:00:00.000Z'),
    },
    {
        _id: '456def789ghi',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        age: 25,
        createdAt: new Date('2022-01-01T00:00:00.000Z'),
        updatedAt: new Date('2022-01-01T00:00:00.000Z'),
    },
] as unknown as UserEntity[];

export const mockUserMongooseProvider = {
    provide: getModelToken(UserEntity.name),
    useValue: {
        new: jest.fn().mockResolvedValue(mockUserEntities[0]),
        constructor: jest.fn().mockResolvedValue(mockUserEntities[0]),
        _id: {
            toString: jest.fn().mockResolvedValue('123abc456def'),
        },
        find: jest.fn(),
        findOne: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findById: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        exec: jest.fn(),
        in: jest.fn(),
        where: jest.fn(),
        equals: jest.fn(),
        aggregate: jest.fn(),
        lookup: jest.fn(),
        match: jest.fn(),
    },
};

@Module({
    providers: [
        {
            provide: UserService,
            useValue: {
                createUser: jest.fn(),
                findAllUsers: jest.fn(),
                findByIdOrThrow: jest.fn(),
                updateUserById: jest.fn(),
                deleteUserById: jest.fn(),
            },
        },
    ],
    exports: [UserService],
})
export class UserModuleMock {}
