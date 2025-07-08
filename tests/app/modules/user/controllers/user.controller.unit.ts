import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUserMongooseProvider } from '../mocks/mongo-mocks';
import { InternalServerErrorException } from '@nestjs/common';
import { mockUserRequests, mockUserResponses } from '../mocks/object-mocks';
import { UserController } from '@/app/modules/user/user.controller';
import { UserService } from '@/app/modules/user/user.service';
import { UserRepository } from '@/app/modules/user/user.repository';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, UserRepository, mockUserMongooseProvider],
            imports: [ConfigModule.forRoot({ isGlobal: true })],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });

    it('should create a user', async () => {
        jest.spyOn(userService, 'createUser').mockResolvedValue(
            mockUserResponses[0],
        );

        const result = await userController.createUser(mockUserRequests[0]);

        expect(result).toBe(mockUserResponses[0]);
    });

    it('should throw an error when creating a user', async () => {
        const internalServerError = new InternalServerErrorException(
            'Internal Server Error',
        );
        jest.spyOn(userService, 'createUser').mockRejectedValue(
            internalServerError,
        );

        await expect(
            userController.createUser(mockUserRequests[0]),
        ).rejects.toThrow(internalServerError);
    });

    it('should return an array of users', async () => {
        jest.spyOn(userService, 'findAllUsers').mockResolvedValue(
            mockUserResponses,
        );

        const result = await userController.findAllUsers();

        expect(result).toBe(mockUserResponses);
    });

    it('should throw an error when finding all users', async () => {
        const internalServerError = new InternalServerErrorException(
            'Internal Server Error',
        );
        jest.spyOn(userService, 'findAllUsers').mockRejectedValue(
            internalServerError,
        );

        await expect(userController.findAllUsers()).rejects.toThrow(
            internalServerError,
        );
    });

    it('should return a user by ID', async () => {
        const userId = '123abc456def';

        jest.spyOn(userService, 'findByIdOrThrow').mockResolvedValue(
            mockUserResponses[0],
        );

        const result = await userController.findUserById(userId);

        expect(result).toBe(mockUserResponses[0]);
    });

    it('should throw an error when finding a user by ID', async () => {
        const userId = '123abc456def';

        const internalServerError = new InternalServerErrorException(
            'Internal Server Error',
        );
        jest.spyOn(userService, 'findByIdOrThrow').mockRejectedValue(
            internalServerError,
        );

        await expect(userController.findUserById(userId)).rejects.toThrow(
            internalServerError,
        );
    });

    it('should update a user by ID', async () => {
        const userId = '123abc456def';

        jest.spyOn(userService, 'updateUserById').mockResolvedValue(
            mockUserResponses[0],
        );

        const result = await userController.updateUserById(
            userId,
            mockUserRequests[0],
        );

        expect(result).toBe(mockUserResponses[0]);
    });

    it('should throw an error when updating a user by ID', async () => {
        const userId = '123abc456def';

        const internalServerError = new InternalServerErrorException(
            'Internal Server Error',
        );
        jest.spyOn(userService, 'updateUserById').mockRejectedValue(
            internalServerError,
        );

        await expect(
            userController.updateUserById(userId, mockUserRequests[0]),
        ).rejects.toThrow(internalServerError);
    });

    it('should delete a user by ID', async () => {
        const userId = '123abc456def';

        jest.spyOn(userService, 'deleteUserById').mockResolvedValue(undefined);

        const result = await userController.removeUserById(userId);

        expect(result).toBeUndefined();
    });

    it('should throw an error when deleting a user by ID', async () => {
        const userId = '123abc456def';

        const internalServerError = new InternalServerErrorException(
            'Internal Server Error',
        );
        jest.spyOn(userService, 'deleteUserById').mockRejectedValue(
            internalServerError,
        );

        await expect(userController.removeUserById(userId)).rejects.toThrow(
            internalServerError,
        );
    });
});
