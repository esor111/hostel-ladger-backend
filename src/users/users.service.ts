import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserDepartment } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email }
      ]
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(filters: any = {}): Promise<{ items: User[]; total: number }> {
    const { page = 1, limit = 50, search, role, department, isActive } = filters;
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    
    if (search) {
      queryBuilder.andWhere(
        '(user.fullName ILIKE :search OR user.username ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` }
      );
    }
    
    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }
    
    if (department) {
      queryBuilder.andWhere('user.department = :department', { department });
    }
    
    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }
    
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
    queryBuilder.orderBy('user.createdAt', 'DESC');
    
    const [items, total] = await queryBuilder.getManyAndCount();
    
    const sanitizedItems = items.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    return { items: sanitizedItems as User[], total };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.username || updateUserDto.email) {
      const conflictUser = await this.userRepository.findOne({
        where: [
          { username: updateUserDto.username },
          { email: updateUserDto.email }
        ]
      });
      
      if (conflictUser && conflictUser.id !== id) {
        throw new ConflictException('Username or email already exists');
      }
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
  }

  async deactivate(id: string): Promise<User> {
    return this.update(id, { isActive: false });
  }

  async activate(id: string): Promise<User> {
    return this.update(id, { isActive: true });
  }

  async updateLastLogin(id: string): Promise<User> {
    await this.userRepository.update(id, { lastLogin: new Date() });
    return this.findOne(id);
  }

  async getStats(): Promise<any> {
    const total = await this.userRepository.count();
    const active = await this.userRepository.count({ where: { isActive: true } });
    const inactive = total - active;

    const roleStats = await this.userRepository
      .createQueryBuilder('user')
      .select('user.role', 'role')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.role')
      .getRawMany();

    const departmentStats = await this.userRepository
      .createQueryBuilder('user')
      .select('user.department', 'department')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.department')
      .getRawMany();

    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogins = await this.userRepository
      .createQueryBuilder('user')
      .where('user.lastLogin >= :dayAgo', { dayAgo })
      .getCount();

    return {
      total,
      active,
      inactive,
      byRole: roleStats.reduce((acc, item) => {
        acc[item.role] = parseInt(item.count);
        return acc;
      }, {}),
      byDepartment: departmentStats.reduce((acc, item) => {
        acc[item.department] = parseInt(item.count);
        return acc;
      }, {}),
      recentLogins
    };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }]
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result as User;
    }

    return null;
  }

  async bulkCreate(users: CreateUserDto[]): Promise<User[]> {
    const createdUsers = [];
    
    for (const userData of users) {
      try {
        const user = await this.create(userData);
        createdUsers.push(user);
      } catch (error) {
        console.error(`Failed to create user ${userData.username}:`, error.message);
      }
    }
    
    return createdUsers;
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    const users = await this.userRepository.find({ where: { role } });
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  }

  async getUsersByDepartment(department: UserDepartment): Promise<User[]> {
    const users = await this.userRepository.find({ where: { department } });
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  }
}