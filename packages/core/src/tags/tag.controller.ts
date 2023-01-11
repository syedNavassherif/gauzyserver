import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	UseGuards,
	Query,
	ValidationPipe,
	UsePipes
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController } from './../core/crud';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { IPagination, ITag, PermissionsEnum } from '@gauzy/contracts';
import { PermissionGuard, TenantPermissionGuard } from './../shared/guards';
import { Permissions } from './../shared/decorators';
import { ParseJsonPipe } from './../shared/pipes';
import { TagListCommand } from './commands';
import { CreateTagDTO } from './dto';

@ApiTags('Tags')
@UseGuards(TenantPermissionGuard)
@Controller()
export class TagController extends CrudController<Tag> {
	constructor(
		private readonly tagService: TagService,
		private readonly commandBus: CommandBus
	) {
		super(tagService);
	}

	@Get('getByName/:name')
	async findByName(@Param('name') name: string): Promise<Tag> {
		return this.tagService.findOneByName(name);
	}

	@Get('level')
	async findAllTags(
		@Query('data', ParseJsonPipe) data: any
	): Promise<IPagination<ITag>> {
		const { relations, findInput } = data;
		return await this.tagService.findAllTags(
			findInput,
			relations
		);
	}

	@Get()
	async findAll(
		@Query('data', ParseJsonPipe) data: any
	): Promise<IPagination<ITag>> {
		const { relations, findInput } = data;
		return await this.commandBus.execute(
			new TagListCommand(findInput, relations)
		);
	}

	@UseGuards(PermissionGuard)
	@Permissions(PermissionsEnum.ORG_TAGS_EDIT)
	@Post()
	@UsePipes(new ValidationPipe({ transform : true }))
	async create(
		@Body() entity: CreateTagDTO
	): Promise<ITag> {
		return await this.tagService.create(entity);
	}
}
