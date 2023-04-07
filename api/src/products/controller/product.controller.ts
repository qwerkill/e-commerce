import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { DeleteResult } from 'typeorm';
import { ProductCreateDTO, ProductUpdateDTO } from '../dto/product.dto';
import { ProductEntity } from '../enitity/product.entity';
import { ProductService } from '../service/product.service';




@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Public()
    @Get()
    getAllProducts(): Promise<ProductEntity[]>{
        return this.productService.getAllProducts();
    }

    @Public()
    @Get(':id')
    getOneProductById(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity>| null{
        return this.productService.getOneProductById(id);
    }
    @Public()
    @Post() 
    createProduct(@Body() data: ProductCreateDTO): Promise<ProductEntity> {
        return this.productService.createProduct(data);
    }
    @Public()
    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() data: ProductUpdateDTO ): Promise<ProductEntity>{
        return this.productService.updateProduct(id, data);
    }
    @Public()
    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{
        return this.productService.deleteProduct(id);
    }
}