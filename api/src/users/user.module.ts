import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controller/user.controlle';
import { UserEntity } from './entity/user.entity';
import { UserService } from './service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([AuthModule]),
],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}