import { IsString, IsEmail, IsEnum, IsOptional, IsArray, IsBoolean, Length, IsPhoneNumber } from 'class-validator';
import { UserRole, UserDepartment } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 100)
  fullName: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsEnum(UserDepartment)
  @IsOptional()
  department?: UserDepartment;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  createdBy?: string;
}