import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { AdminCharge } from './admin-charge.entity';

export enum ChargeCategory {
  LATE_FEE = 'late_fee',
  PENALTY = 'penalty',
  ADMIN_FEE = 'admin_fee',
  SERVICE_CHARGE = 'service_charge',
  CUSTOM = 'custom'
}

@Entity('charge_types')
@Index(['code'], { unique: true })
@Index(['category'])
@Index(['isActive'])
@Index(['isSystemDefined'])
export class ChargeType extends BaseEntity {
  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 200 })
  label: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ChargeCategory,
    default: ChargeCategory.CUSTOM
  })
  category: ChargeCategory;

  @Column({ 
    name: 'default_amount', 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    nullable: true 
  })
  defaultAmount: number;

  @Column({ name: 'is_system_defined', default: false })
  isSystemDefined: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'requires_approval', default: false })
  requiresApproval: boolean;

  @Column({ 
    name: 'max_amount', 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    nullable: true 
  })
  maxAmount: number;

  // Relations
  @OneToMany(() => AdminCharge, adminCharge => adminCharge.chargeType)
  adminCharges: AdminCharge[];

  // Computed properties for API compatibility
  get value(): string {
    return this.code;
  }

  get isCustom(): boolean {
    return this.category === ChargeCategory.CUSTOM;
  }
}