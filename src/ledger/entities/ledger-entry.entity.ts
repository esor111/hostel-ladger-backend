import { Entity, Column, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';
import { AdminCharge } from '../../admin-charges/entities/admin-charge.entity';
import { Discount } from '../../discounts/entities/discount.entity';

export enum LedgerEntryType {
  INVOICE = 'Invoice',
  PAYMENT = 'Payment',
  DISCOUNT = 'Discount',
  ADJUSTMENT = 'Adjustment',
  REFUND = 'Refund',
  PENALTY = 'Penalty',
  CREDIT_NOTE = 'Credit Note',
  DEBIT_NOTE = 'Debit Note',
  ADMIN_CHARGE = 'Admin Charge'
}

export enum LedgerEntrySource {
  MANUAL = 'manual',
  INVOICE = 'invoice',
  PAYMENT = 'payment',
  ADMIN_CHARGE = 'admin_charge',
  DISCOUNT = 'discount',
  ADJUSTMENT = 'adjustment',
  SYSTEM = 'system'
}

export enum BalanceType {
  DR = 'Dr',
  CR = 'Cr',
  NIL = 'Nil'
}

@Entity('ledger_entries')
@Index(['studentId'])
@Index(['date'])
@Index(['type'])
@Index(['referenceId'])
@Index(['balanceType'])
@Index(['chargeId'])
@Index(['discountId'])
@Index(['entrySource'])
export class LedgerEntry extends BaseEntity {
  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: LedgerEntryType
  })
  type: LedgerEntryType;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'reference_id', nullable: true })
  referenceId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  debit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  credit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({
    name: 'balance_type',
    type: 'enum',
    enum: BalanceType,
    default: BalanceType.NIL
  })
  balanceType: BalanceType;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'entry_number', type: 'int', nullable: true })
  entryNumber: number;

  @Column({ name: 'is_reversed', default: false })
  isReversed: boolean;

  @Column({ name: 'reversed_by', length: 50, nullable: true })
  reversedBy: string;

  @Column({ name: 'reversal_date', type: 'date', nullable: true })
  reversalDate: Date;

  @Column({ name: 'charge_id', nullable: true })
  chargeId: string;

  @Column({ name: 'discount_id', nullable: true })
  discountId: string;

  @Column({ name: 'admin_notes', type: 'text', nullable: true })
  adminNotes: string;

  @Column({
    name: 'entry_source',
    type: 'enum',
    enum: LedgerEntrySource,
    default: LedgerEntrySource.MANUAL
  })
  entrySource: LedgerEntrySource;

  // Computed Properties for API compatibility
  get studentName(): string {
    return this.student?.name || '';
  }

  // Relations
  @ManyToOne(() => Student, student => student.ledgerEntries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @OneToOne(() => AdminCharge, adminCharge => adminCharge.ledgerEntry, { nullable: true })
  @JoinColumn({ name: 'charge_id' })
  adminCharge: AdminCharge;

  @OneToOne(() => Discount, discount => discount.ledgerEntry, { nullable: true })
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;
}