import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserErrorEnum } from '@/app/modules/user/enums/user-error.enum';
import { UserRepository } from '@/app/modules/user/user.repository';
import { UserService } from '@/app/modules/user/user.service';
import {
    mockUserEntities,
    mockUserMongooseProvider,
} from '../mocks/mongo-mocks';
import { mockUserRequests, mockUserResponses } from '../mocks/object-mocks';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            providers: [UserService, UserRepository, mockUserMongooseProvider],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    describe('createUser', () => {
        it('should create a user', async () => {
            jest.spyOn(userRepository, 'findByName').mockResolvedValue(null);
            jest.spyOn(userRepository, 'create').mockResolvedValue(
                mockUserEntities[0],
            );

            const result = await userService.createUser(mockUserRequests[0]);

            expect(result).toEqual(mockUserResponses[0]);
        });

        it('should throw error when user name already exists', async () => {
            jest.spyOn(userRepository, 'findByName').mockResolvedValue(
                mockUserEntities[0],
            );

            await expect(
                userService.createUser(mockUserRequests[0]),
            ).rejects.toThrow(
                new BadRequestException(UserErrorEnum.USER_NAME_ALREADY_EXISTS),
            );
        });
    });

    describe('findAllUsers', () => {
        it('should return all users', async () => {
            jest.spyOn(userRepository, 'find').mockResolvedValue(
                mockUserResponses,
            );

            const result = await userService.findAllUsers();

            expect(result).toEqual(mockUserResponses);
        });
    });

    describe('findByIdOrThrow', () => {
        it('should return a user by ID', async () => {
            const userId = '123abc456def';
            jest.spyOn(userRepository, 'findById').mockResolvedValue(
                mockUserEntities[0],
            );

            const result = await userService.findByIdOrThrow(userId);

            expect(result).toEqual(mockUserResponses[0]);
        });

        it('should throw error when user not found', async () => {
            const userId = '123abc456def';
            jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

            await expect(userService.findByIdOrThrow(userId)).rejects.toThrow(
                new NotFoundException(UserErrorEnum.USER_NOT_FOUND),
            );
        });
    });

    describe('updateUserById', () => {
        it('should update a user by ID', async () => {
            const userId = '123abc456def';
            jest.spyOn(userRepository, 'findById').mockResolvedValue(
                mockUserEntities[0],
            );
            jest.spyOn(userRepository, 'findByName').mockResolvedValue(null);
            jest.spyOn(userRepository, 'update').mockResolvedValue(
                mockUserEntities[0],
            );

            const result = await userService.updateUserById(
                userId,
                mockUserRequests[0],
            );

            expect(result).toEqual(mockUserResponses[0]);
        });

        it('should throw error when user not found', async () => {
            const userId = '123abc456def';
            jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

            await expect(
                userService.updateUserById(userId, mockUserRequests[0]),
            ).rejects.toThrow(
                new NotFoundException(UserErrorEnum.USER_NOT_FOUND),
            );
        });
    });

    describe('deleteUserById', () => {
        it('should delete a user by ID', async () => {
            const userId = '123abc456def';
            jest.spyOn(userRepository, 'findById').mockResolvedValue(
                mockUserEntities[0],
            );
            jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

            const result = await userService.deleteUserById(userId);

            expect(result).toBeUndefined();
        });

        it('should throw error when user not found', async () => {
            const userId = '123abc456def';
            jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

            await expect(userService.deleteUserById(userId)).rejects.toThrow(
                new NotFoundException(UserErrorEnum.USER_NOT_FOUND),
            );
        });
    });

    describe('findByNameAndThrow', () => {
        it('should not throw when user name does not exist', async () => {
            const userName = 'Non Existent User';
            jest.spyOn(userRepository, 'findByName').mockResolvedValue(null);

            await expect(
                userService.findByNameAndThrow(userName),
            ).resolves.toBeUndefined();
        });

        it('should throw error when user name already exists', async () => {
            const userName = 'John Doe';
            jest.spyOn(userRepository, 'findByName').mockResolvedValue(
                mockUserEntities[0],
            );

            await expect(
                userService.findByNameAndThrow(userName),
            ).rejects.toThrow(
                new BadRequestException(UserErrorEnum.USER_NAME_ALREADY_EXISTS),
            );
        });
    });
});
