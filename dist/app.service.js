"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AppService = class AppService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getHello() {
        return 'Kaha Hostel Management API is running!';
    }
    async getHealthStatus() {
        try {
            const isConnected = this.dataSource.isInitialized;
            if (isConnected) {
                await this.dataSource.query('SELECT 1');
            }
            return {
                status: 'ok',
                timestamp: new Date().toISOString(),
                database: {
                    connected: isConnected,
                    type: this.dataSource.options.type,
                    database: this.dataSource.options.database,
                },
                environment: process.env.NODE_ENV || 'development',
            };
        }
        catch (error) {
            return {
                status: 'error',
                timestamp: new Date().toISOString(),
                database: {
                    connected: false,
                    error: error.message,
                },
                environment: process.env.NODE_ENV || 'development',
            };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppService);
//# sourceMappingURL=app.service.js.map