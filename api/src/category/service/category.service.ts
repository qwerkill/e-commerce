import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryCreateDTO, CategoryUpdateDTO } from '../dto/category.dto';
import { CategoryEntity } from '../entity/category.entity';

Injectable();
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async getAllCategories() {
        return await this.categoryRepository.find({relations: ['products']});
    }

    async createCategory(data: CategoryCreateDTO) {
        try {
            return this.categoryRepository.save(data);
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating category');
        }
    }

    async getOneCategoryById(id: number) {
        return await this.categoryRepository.findOne({ 
            where: { id },
            relations: ['products']
         });
    }

    async updateCategory(id: number, data: CategoryUpdateDTO) {
        const category = await this.categoryRepository.findOneBy({ id });
        const categoryUpdate = { ...category, ...data };
        await this.categoryRepository.save(categoryUpdate);

        return categoryUpdate;
    }

    async deleteCategory(id: number) {
        return await this.categoryRepository.delete(id);
    }

}