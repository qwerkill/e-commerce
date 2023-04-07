import { Module, Global, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtConstants } from './constantes';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
    imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
        global: true,
        secret: JwtConstants.secret,
        signOptions: { expiresIn: '10000000000000000000' },
      }),
    ],
    providers: [AuthService,  {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, JwtService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard, JwtService],
  })

  
  export class AuthModule {}