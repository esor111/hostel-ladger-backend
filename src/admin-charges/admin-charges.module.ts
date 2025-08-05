import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminChargesController, ChargeTypesController } from './admin-charges.controller';
import { AdminChargesService } from './admin-charges.service';
import { AdminCharge } from './entities/admin-charge.entity';
import { ChargeType } from './entities/charge-type.entity';
import { Student } from '../students/entities/student.entity';
import { LedgerEntry } from '../ledger/entities/ledger-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminCharge,
      ChargeType,
      Student,
      LedgerEntry
    ])
  ],
  controllers: [AdminChargesController, ChargeTypesController],
  providers: [AdminChargesService],
  exports: [AdminChargesService]
})
export class AdminChargesModule {}