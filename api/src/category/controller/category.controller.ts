import { Controller, Get, Post, Body, Param, Delete, Put,ParseIntPipe } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { CategoryCreateDTO, CategoryUpdateDTO } from '../dto/category.dto';
import { CategoryService } from '../service/category.service';

@Controller('categories')

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Public()
    @Get()
    getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Public()
    @Get(':id')
    getOneCategoryById(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.getOneCategoryById(id);
    }

    @Public()
    @Post()
    createCategory(@Body() data: CategoryCreateDTO) {
        return this.categoryService.createCategory(data);
    }

    @Public()
    @Put(':id')
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CategoryUpdateDTO,
    ) {
        return this.categoryService.updateCategory(id, data);
    }

    @Public()
    @Delete(':id')
    deleteCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.deleteCategory(id);
    }

}

