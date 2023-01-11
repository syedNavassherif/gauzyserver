import {
	Controller,
	HttpStatus,
	Get,
	Post,
	UseInterceptors,
	Body,
	UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { CommandBus } from '@nestjs/cqrs';
import { IImportHistory, ImportStatusEnum, ImportTypeEnum, IPagination, PermissionsEnum, UploadedFile } from '@gauzy/contracts';
import { ImportAllService } from './import-all.service';
import { RequestContext } from './../../core/context';
import { FileStorage, UploadedFileStorage } from '../../core/file-storage';
import { ImportHistoryCreateCommand, ImportHistoryService } from './../import-history';
import { PermissionGuard, TenantPermissionGuard } from './../../shared/guards';
import { Permissions } from './../../shared/decorators';

@ApiTags('Import')
@UseGuards(TenantPermissionGuard)
@Controller()
export class ImportAllController {
	constructor(
		private readonly importAllService: ImportAllService,
		private readonly importHistoryService: ImportHistoryService,
		private readonly commandBus: CommandBus
	) {}

	@ApiOperation({ summary: 'Find all imports history.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found import history'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@UseGuards(PermissionGuard)
	@Permissions(PermissionsEnum.IMPORT_EXPORT_VIEW)
	@Get()
	async importAll(): Promise<IPagination<IImportHistory>> {
		return this.importHistoryService.findAll({
			order: {
				importDate: 'DESC'
			}
		});
	}

	@UseInterceptors(
		FileInterceptor('file', {
			storage: new FileStorage().storage({
				dest: path.join('import'),
				prefix: 'import'
			})
		})
	)
	@ApiOperation({ summary: 'Imports templates records.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found tables'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Post()
	async parse(
		@Body() { importType },
		@UploadedFileStorage() file: UploadedFile
	) {
		const { key, originalname, size } = file;
		const history = {
			file: originalname,
			path: key,
			size: size,
			tenantId: RequestContext.currentTenantId()
		}
		try {
			await this.importAllService.unzipAndParse(
				key,
				importType === ImportTypeEnum.CLEAN
			);
			this.importAllService.removeExtractedFiles();
			return await this.commandBus.execute(
				new ImportHistoryCreateCommand({
					...history,
					status: ImportStatusEnum.SUCCESS
				})
			);
		} catch (error) {
			return await this.commandBus.execute(
				new ImportHistoryCreateCommand({
					...history,
					status: ImportStatusEnum.FAILED
				})
			);
		}
	}
}
