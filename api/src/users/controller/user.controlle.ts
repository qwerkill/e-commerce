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
  import { UserCreateDTO, UserUpdateDTO } from '../dto/user.dto';
  import {UserService } from '../service/user.service';
  
  
  @Controller('users')
  export class UserController {
    
    constructor(private readonly userService: UserService) {}
  
    @Public()
    @Get()
    getAllUsers() {
      return this.userService.getAllUsers();
    }
  
    @Public()
    @Get(':id')
    getOneUserById(@Param('id', ParseIntPipe) id: number) {
      return this.userService.getOneUserById(id);
    }

    @Public()
    @Post()
    createUser(@Body() data: UserCreateDTO) {
      return this.userService.createUser(data);
    }
  
    @Public()
    @Put(':id')
    updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: UserUpdateDTO,
    ) {
      return this.userService.updateUser(id, data);
    }
  
    @Public()
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
      return this.userService.deleteUser(id);
    }
  }
  