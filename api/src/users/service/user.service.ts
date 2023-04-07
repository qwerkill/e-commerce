import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';


Injectable();
export class UserService {
  constructor(

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({relations: ['orders']});
  }

  async createUser(data: UserCreateDTO) {
    try {
      return this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
  async getOneUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOne(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async updateUser(id: number, data: UserUpdateDTO) {
    const user = await this.userRepository.findOneBy({ id });

    const userUpdate = { ...user, ...data };
    await this.userRepository.save(userUpdate);

    return userUpdate;
  }
  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
