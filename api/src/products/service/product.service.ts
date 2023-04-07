import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductCreateDTO,ProductUpdateDTO } from "../dto/product.dto";
import { ProductEntity } from "../enitity/product.entity";


Injectable()

export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ){}

    async getAllProducts(){
        return await this.productRepository.find({relations: ['category_id']});
    }
   

    async createProduct(data: ProductCreateDTO){
        try{
            return this.productRepository.save(data);
        }catch(error){
            console.log(error);
            throw new Error('Error while creating product');
        }
    }

    async getOneProductById(id: number){
        return await this.productRepository.findOne({
            where: {id},
            relations: ['category_id']
        });
    }

    async updateProduct(id: number, data: ProductUpdateDTO){
        const product = await this.productRepository.findOneBy({id});
        const productUpdate = {...product, ...data};
        await this.productRepository.save(productUpdate);
        return productUpdate;
    }

    async deleteProduct(id: number){
        return await this.productRepository.delete(id);
    }
}