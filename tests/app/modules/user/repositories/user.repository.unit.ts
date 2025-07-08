import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { UserRepository } from '@/app/modules/user/user.repository';
import {
    mockUserEntities,
    mockUserMongooseProvider,
} from '../mocks/mongo-mocks';
import { mockUserRequests } from '../mocks/object-mocks';

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule],
            providers: [UserRepository, mockUserMongooseProvider],
        }).compile();

        userRepository = moduleRef.get(UserRepository);
    });

    describe('create', () => {
        it('should create a user', async () => {
            jest.spyOn(
                mockUserMongooseProvider.useValue,
                'create',
            ).mockResolvedValue(mockUserEntities[0]);

            const result = await userRepository.create(mockUserRequests[0]);

            expect(result).toEqual(mockUserEntities[0]);
            expect(
                mockUserMongooseProvider.useValue.create,
            ).toHaveBeenCalledWith(mockUserRequests[0]);
        });
    });

    describe('find', () => {
        it('should return all users', async () => {
            jest.spyOn(
                mockUserMongooseProvider.useValue,
                'find',
            ).mockResolvedValue(mockUserEntities);

            const result = await userRepository.find();

            expect(result).toEqual(mockUserEntities);
        });
    });

    describe('findById', () => {
        it('should return a user by ID', async () => {
            const userId = '123abc456def';
            jest.spyOn(
                mockUserMongooseProvider.useValue,
                'findById',
            ).mockResolvedValue(mockUserEntities[0]);

            const result = await userRepository.findById(userId);

            expect(result).toEqual(mockUserEntities[0]);
        });
    });

    describe('findByName', () => {
        it('should return a user by name', async () => {
            const userName = 'John Doe';
            jest.spyOn(
                mockUserMongooseProvider.useValue,
                'findOne',
            ).mockResolvedValue(mockUserEntities[0]);

            const result = await userRepository.findByName(userName);

            expect(result).toEqual(mockUserEntities[0]);
        });
    });

    describe('update', () => {
        it('should update a user by ID', async () => {
            const userId = '123abc456def';
            jest.spyOn(
                mockUserMongooseProvider.useValue,
                'findByIdAndUpdate',
            ).mockResolvedValue(mockUserEntities[0]);

            const result = await userRepository.update(
                userId,
                mockUserRequests[0],
            );

            expect(result).toEqual(mockUserEntities[0]);
        });
    });

    describe('delete', () => {
        it('should delete a user by ID', async () => {
            const userId = '123abc456def';
            jest.spyOn(
                mockUserMongooseProvider.useValue,
                'deleteOne',
            ).mockResolvedValue(undefined);

            await userRepository.delete(userId);

            expect(
                mockUserMongooseProvider.useValue.deleteOne,
            ).toHaveBeenCalledWith({
                _id: userId,
            });
        });
    });
});
