import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RouterModule } from 'nest-router';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '@gauzy/config';
import { getEntitiesFromPlugins } from '@gauzy/plugin';
import { ImportAllController } from './import-all.controller';
import { ImportAllService } from './import-all.service';
import { coreEntities } from './../../core/entities';
import { CommandHandlers } from './commands/handlers';
import { ImportRecordModule } from './../import-record';
import { ImportHistoryModule } from './../import-history';
import { TenantModule } from './../../tenant/tenant.module';
import { UserModule } from './../../user/user.module';

@Module({
	imports: [
		RouterModule.forRoutes([
			{
				path: '/import',
				module: ImportAllModule
			}
		]),
		CqrsModule,
		MulterModule.register({
			dest: './import'
		}),
		TypeOrmModule.forFeature([
			...coreEntities,
			...getEntitiesFromPlugins(getConfig().plugins)
		]),
		TenantModule,
		UserModule,
		ImportRecordModule,
		ImportHistoryModule
	],
	controllers: [ImportAllController],
	providers: [
		ImportAllService,
		...CommandHandlers
	],
	exports: []
})
export class ImportAllModule {}
