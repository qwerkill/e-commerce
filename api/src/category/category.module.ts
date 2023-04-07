import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { CategoryController } from "./controller/category.controller";
import { CategoryEntity } from "./entity/category.entity";
import { CategoryService } from "./service/category.service";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}