"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ledger_controller_1 = require("./ledger.controller");
const ledger_service_1 = require("./ledger.service");
const ledger_entry_entity_1 = require("./entities/ledger-entry.entity");
const student_entity_1 = require("../students/entities/student.entity");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const discount_entity_1 = require("../discounts/entities/discount.entity");
let LedgerModule = class LedgerModule {
};
exports.LedgerModule = LedgerModule;
exports.LedgerModule = LedgerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                ledger_entry_entity_1.LedgerEntry,
                student_entity_1.Student,
                invoice_entity_1.Invoice,
                payment_entity_1.Payment,
                discount_entity_1.Discount
            ])],
        controllers: [ledger_controller_1.LedgerController],
        providers: [ledger_service_1.LedgerService],
        exports: [ledger_service_1.LedgerService],
    })
], LedgerModule);
//# sourceMappingURL=ledger.module.js.map