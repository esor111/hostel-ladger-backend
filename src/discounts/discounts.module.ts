import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsController, DiscountTypesController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { Discount } from './entities/discount.entity';
import { DiscountType } from './entities/discount-type.entity';
import { Student } from '../students/entities/student.entity';
import { LedgerEntry } from '../ledger/entities/ledger-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Discount,
      DiscountType,
      Student,
      LedgerEntry
    ])
  ],
  controllers: [DiscountsController, DiscountTypesController],
  providers: [DiscountsService],
  exports: [DiscountsService]
})
export class DiscountsModule {}