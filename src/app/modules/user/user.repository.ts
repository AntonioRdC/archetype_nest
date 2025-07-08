import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from './entities/user.entity';
import { UserReqDto } from './dtos/request/user-req.dto';
import { UserResDto } from './dtos/response/user-res.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(UserEntity.name)
        private userModel: Model<UserDocument>,
    ) {}

    async create(userReqDto: UserReqDto): Promise<UserEntity> {
        return await this.userModel.create(userReqDto);
    }

    async find(): Promise<UserResDto[]> {
        return await this.userModel.find();
    }

    async findById(userId: string): Promise<UserEntity> {
        return await this.userModel.findById(userId);
    }

    async findByName(name: string): Promise<UserEntity> {
        return await this.userModel.findOne({ name });
    }

    async update(
        userId: string,
        updateUserReqDto: UserReqDto,
    ): Promise<UserEntity> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            updateUserReqDto,
            {
                new: true,
            },
        );
    }

    async delete(_id: string): Promise<void> {
        await this.userModel.deleteOne({ _id });
    }
}
