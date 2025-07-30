"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const students_module_1 = require("./students/students.module");
const rooms_module_1 = require("./rooms/rooms.module");
const invoices_module_1 = require("./invoices/invoices.module");
const payments_module_1 = require("./payments/payments.module");
const ledger_module_1 = require("./ledger/ledger.module");
const bookings_module_1 = require("./bookings/bookings.module");
const discounts_module_1 = require("./discounts/discounts.module");
const reports_module_1 = require("./reports/reports.module");
const seed_module_1 = require("./database/seeds/seed.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            students_module_1.StudentsModule,
            rooms_module_1.RoomsModule,
            invoices_module_1.InvoicesModule,
            payments_module_1.PaymentsModule,
            ledger_module_1.LedgerModule,
            bookings_module_1.BookingsModule,
            discounts_module_1.DiscountsModule,
            reports_module_1.ReportsModule,
            seed_module_1.SeedModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map