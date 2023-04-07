import { IsInt, IsOptional, IsString } from "class-validator";
import { CategoryEntity } from "src/category/entity/category.entity";

export class ProductCreateDTO {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsOptional()
    category_id: CategoryEntity;
    @IsString()
    img: string;
    @IsInt()
    price: number;
}

export class ProductUpdateDTO {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsString()
    img: string;
    @IsOptional()
    @IsInt()
    price: number;
    @IsOptional()
    category_id: CategoryEntity;
}