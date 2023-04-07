import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './orders/order.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';
import { CategoryModule } from './category/category.module';
import { OrderItemModule } from './orders_item/order_item.module';
import { JWTGuard } from './auth/guard/jwt.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    OrderModule,
    ProductModule,
    UserModule,
    CategoryModule,
    OrderItemModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JWTGuard],
})

export class AppModule {}