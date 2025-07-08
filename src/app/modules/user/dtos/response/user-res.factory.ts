import { UserEntity } from '../../entities/user.entity';
import { UserResDto } from './user-res.dto';

export class UserResFactory {
    static build(userEntity: UserEntity): UserResDto {
        return {
            _id: userEntity._id.toString(),
            name: userEntity.name,
            email: userEntity.email,
            password: userEntity.password,
            age: userEntity.age,
            createdAt: userEntity.createdAt,
            updatedAt: userEntity.updatedAt,
        };
    }
}
