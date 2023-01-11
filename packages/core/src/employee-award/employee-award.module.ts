import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { EmployeeAward } from './employee-award.entity';
import { EmployeeAwardController } from './employee-award.controller';
import { EmployeeAwardService } from './employee-award.service';
import { TenantModule } from '../tenant/tenant.module';
import { UserModule } from './../user/user.module';

@Module({
	imports: [
		RouterModule.forRoutes([
			{ path: '/employee-award', module: EmployeeAwardModule }
		]),
		TypeOrmModule.forFeature([EmployeeAward]),
		TenantModule,
		UserModule
	],
	controllers: [EmployeeAwardController],
	providers: [EmployeeAwardService]
})
export class EmployeeAwardModule {}
