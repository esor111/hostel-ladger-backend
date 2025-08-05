import { Entity, Column, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
import { ChargeType } from './charge-type.entity';
import { LedgerEntry } from '../../ledger/entities/ledger-entry.entity';

export enum ChargeStatus {
  ACTIVE = 'active',
  REVERSED = 'reversed'
}

@Entity('admin_charges')
@Index(['studentId'])
@Index(['appliedAt'])
@Index(['status'])
@Index(['chargeTypeId'])
@Index(['appliedBy'])
@Index(['referenceId'], { unique: true })
export class AdminCharge extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'charge_type_id', nullable: true })
  chargeTypeId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'custom_description', type: 'text', nullable: true })
  customDescription: string;

  @Column({ name: 'admin_notes', type: 'text', nullable: true })
  adminNotes: string;

  @Column({ name: 'applied_by', length: 100 })
  appliedBy: string;

  @Column({ name: 'applied_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt: Date;

  @Column({ name: 'reference_id', length: 100, nullable: true })
  referenceId: string;

  @Column({
    type: 'enum',
    enum: ChargeStatus,
    default: ChargeStatus.ACTIVE
  })
  status: ChargeStatus;

  @Column({ name: 'reversed_by', length: 100, nullable: true })
  reversedBy: string;

  @Column({ name: 'reversal_reason', type: 'text', nullable: true })
  reversalReason: string;

  @Column({ name: 'reversed_at', type: 'timestamp', nullable: true })
  reversedAt: Date;

  // Computed properties for API compatibility
  get studentName(): string {
    return this.student?.name || '';
  }

  get roomNumber(): string {
    return this.student?.room?.roomNumber || '';
  }

  get chargeTypeName(): string {
    return this.chargeType?.label || 'Custom Charge';
  }

  get isReversed(): boolean {
    return this.status === ChargeStatus.REVERSED;
  }

  get effectiveDescription(): string {
    return this.customDescription || this.description;
  }

  // Relations
  @ManyToOne(() => Student, student => student.adminCharges, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => ChargeType, chargeType => chargeType.adminCharges, { nullable: true })
  @JoinColumn({ name: 'charge_type_id' })
  chargeType: ChargeType;

  @OneToOne(() => LedgerEntry, ledgerEntry => ledgerEntry.adminCharge)
  ledgerEntry: LedgerEntry;
}