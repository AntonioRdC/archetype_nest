import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { UserReqDto } from './dtos/request/user-req.dto';
import { UserResDto } from './dtos/response/user-res.dto';
import { UserRepository } from './user.repository';
import { UserErrorEnum } from './enums/user-error.enum';
import { UserResFactory } from './dtos/response/user-res.factory';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly userRepository: UserRepository) {}

    async createUser(userReqDto: UserReqDto): Promise<UserResDto> {
        this.logger.log(
            `[UserService] createUser - received parameters userReqDto: ${JSON.stringify(
                userReqDto,
            )}`,
        );

        await this.findByNameAndThrow(userReqDto.name);

        const response = await this.userRepository.create(userReqDto);

        this.logger.log(`Return from createUser: ${JSON.stringify(response)}`);

        return UserResFactory.build(response);
    }

    async findAllUsers(): Promise<UserResDto[]> {
        const response = await this.userRepository.find();

        this.logger.log(
            `Return from findAllUsers: ${JSON.stringify(response)}`,
        );

        return response;
    }

    async updateUserById(
        userId: string,
        updateUserReqDto: UserReqDto,
    ): Promise<UserResDto> {
        this.logger.log(
            `[UserService] updateUserById - received parameters userId: ${userId} and updateUserReqDto: ${JSON.stringify(
                updateUserReqDto,
            )}`,
        );

        const existingUser = await this.findByIdOrThrow(userId);

        await this.findByNameAndThrow(updateUserReqDto.name);

        const response = await this.userRepository.update(
            existingUser._id,
            updateUserReqDto,
        );

        this.logger.log(
            `Return from updateUserById: ${JSON.stringify(response)}`,
        );

        return UserResFactory.build(response);
    }

    async deleteUserById(userId: string): Promise<void> {
        this.logger.log(
            `[UserService] deleteUserById - received parameters userId: ${userId}`,
        );

        const existingUser = await this.findByIdOrThrow(userId);

        const response = await this.userRepository.delete(existingUser._id);

        this.logger.log(
            `Return from deleteUserById: ${JSON.stringify(response)}`,
        );
    }

    async findByIdOrThrow(userId: string): Promise<UserResDto> {
        this.logger.log(
            `[UserService] findByIdOrThrow - received parameters userId: ${userId}`,
        );
        const user = await this.userRepository.findById(userId);
        if (!user) throw new NotFoundException(UserErrorEnum.USER_NOT_FOUND);

        this.logger.log(`Return from findByIdOrThrow: ${JSON.stringify(user)}`);

        return UserResFactory.build(user);
    }

    async findByNameAndThrow(userName: string): Promise<void> {
        const user = await this.userRepository.findByName(userName);
        if (user)
            throw new BadRequestException(
                UserErrorEnum.USER_NAME_ALREADY_EXISTS,
            );
    }
}
