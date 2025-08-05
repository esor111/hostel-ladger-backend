import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  ACCOUNTANT = 'accountant',
  MAINTENANCE = 'maintenance',
}

export enum UserDepartment {
  ADMINISTRATION = 'administration',
  ACCOUNTS = 'accounts',
  MAINTENANCE = 'maintenance',
  RECEPTION = 'reception',
  SECURITY = 'security',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 255, nullable: true })
  password: string; // In production, this should be hashed

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserDepartment,
    default: UserDepartment.ADMINISTRATION,
  })
  department: UserDepartment;

  @Column('simple-array', { nullable: true })
  permissions: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ length: 500, nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 100, nullable: true })
  createdBy: string;

  @Column({ length: 100, nullable: true })
  updatedBy: string;
}