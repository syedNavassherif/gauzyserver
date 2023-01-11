import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TenantModule } from './../../tenant/tenant.module';
import { EmployeeModule } from './../../employee/employee.module';
import { OrganizationProjectModule } from './../../organization-project/organization-project.module';
import { OrganizationContactModule } from './../../organization-contact/organization-contact.module';
import { CommandHandlers } from './commands/handlers';
import { TimeLog } from './time-log.entity';
import { TimeLogController } from './time-log.controller';
import { TimeLogService } from './time-log.service';
import { TimeSlotModule } from './../time-slot/time-slot.module';
import { UserModule } from './../../user/user.module';

@Module({
	controllers: [
		TimeLogController
	],
	imports: [
		TypeOrmModule.forFeature([
			TimeLog
		]),
		TenantModule,
		forwardRef(() => UserModule),
		forwardRef(() => EmployeeModule),
		forwardRef(() => OrganizationProjectModule),
		forwardRef(() => OrganizationContactModule),
		forwardRef(() => TimeSlotModule),
		CqrsModule
	],
	providers: [
		TimeLogService,
		...CommandHandlers
	],
	exports: [
		TimeLogService,
		TypeOrmModule
	]
})
export class TimeLogModule {}
