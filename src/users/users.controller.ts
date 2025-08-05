import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  Put,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRole, UserDepartment } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user
    };
  }

  @Get()
  async findAll(@Query() query: any) {
    const result = await this.usersService.findAll(query);
    return {
      status: HttpStatus.OK,
      message: 'Users retrieved successfully',
      result: {
        items: result.items,
        pagination: {
          page: parseInt(query.page) || 1,
          limit: parseInt(query.limit) || 50,
          total: result.total,
          totalPages: Math.ceil(result.total / (parseInt(query.limit) || 50))
        }
      }
    };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.usersService.getStats();
    return {
      status: HttpStatus.OK,
      message: 'User statistics retrieved successfully',
      stats
    };
  }

  @Get('role/:role')
  async getUsersByRole(@Param('role') role: UserRole) {
    const users = await this.usersService.getUsersByRole(role);
    return {
      status: HttpStatus.OK,
      message: `Users with role ${role} retrieved successfully`,
      data: users
    };
  }

  @Get('department/:department')
  async getUsersByDepartment(@Param('department') department: UserDepartment) {
    const users = await this.usersService.getUsersByDepartment(department);
    return {
      status: HttpStatus.OK,
      message: `Users in department ${department} retrieved successfully`,
      data: users
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      status: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: user
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      status: HttpStatus.OK,
      message: 'User updated successfully',
      data: user
    };
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    const user = await this.usersService.deactivate(id);
    return {
      status: HttpStatus.OK,
      message: 'User deactivated successfully',
      data: user
    };
  }

  @Patch(':id/activate')
  async activate(@Param('id') id: string) {
    const user = await this.usersService.activate(id);
    return {
      status: HttpStatus.OK,
      message: 'User activated successfully',
      data: user
    };
  }

  @Patch(':id/last-login')
  async updateLastLogin(@Param('id') id: string) {
    const user = await this.usersService.updateLastLogin(id);
    return {
      status: HttpStatus.OK,
      message: 'Last login updated successfully',
      data: user
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return {
      status: HttpStatus.NO_CONTENT,
      message: 'User deleted successfully'
    };
  }

  @Post('bulk')
  async bulkCreate(@Body() createUsersDto: { users: CreateUserDto[] }) {
    const users = await this.usersService.bulkCreate(createUsersDto.users);
    return {
      status: HttpStatus.CREATED,
      message: `${users.length} users created successfully`,
      data: users
    };
  }

  @Post('validate')
  async validateUser(@Body() credentials: { username: string; password: string }) {
    const user = await this.usersService.validateUser(credentials.username, credentials.password);
    
    if (!user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
        data: null
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'User validated successfully',
      data: user
    };
  }
}
