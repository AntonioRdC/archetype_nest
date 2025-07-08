import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserReqDto } from './dtos/request/user-req.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserResDto } from './dtos/response/user-res.dto';
import { Swagger } from '@/app/commons/decorators/swagger.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Swagger({
        summary: 'Create user',
        status: 201,
        type: UserResDto,
    })
    @HttpCode(201)
    @Post()
    async createUser(@Body() createUserDto: UserReqDto): Promise<UserResDto> {
        return await this.userService.createUser(createUserDto);
    }

    @Swagger({
        summary: 'Find all users',
        status: 200,
        type: [UserResDto],
    })
    @Get()
    async findAllUsers(): Promise<UserResDto[]> {
        return await this.userService.findAllUsers();
    }

    @Swagger({
        summary: 'Find one user',
        status: 200,
        type: UserResDto,
    })
    @Get(':id')
    async findUserById(@Param('id') id: string): Promise<UserResDto> {
        return await this.userService.findByIdOrThrow(id);
    }

    @Swagger({
        summary: 'Update user',
        status: 200,
        type: UserResDto,
    })
    @Put(':id')
    async updateUserById(
        @Param('id') id: string,
        @Body() updateUserDto: UserReqDto,
    ): Promise<UserResDto> {
        return await this.userService.updateUserById(id, updateUserDto);
    }

    @Swagger({
        summary: 'Delete user',
        status: 204,
    })
    @HttpCode(204)
    @Delete(':id')
    async removeUserById(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUserById(id);
    }
}
