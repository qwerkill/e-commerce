import { IsOptional, IsString } from "class-validator";

export class CategoryCreateDTO{
    @IsString()
    title: string;
    @IsString()
    description: string;
}

export class CategoryUpdateDTO{
    @IsOptional()
    @IsString()
    id: number;
    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    description: string;
}