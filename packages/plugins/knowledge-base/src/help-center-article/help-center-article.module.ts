import { CqrsModule } from '@nestjs/cqrs';
import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule, UserModule } from '@gauzy/core';
import { HelpCenterArticle } from './help-center-article.entity';
import { HelpCenterArticleService } from './help-center-article.service';
import { HelpCenterArticleController } from './help-center-article.controller';
import { CommandHandlers } from './commands/handlers';
import { RouterModule } from 'nest-router';

@Module({
	imports: [
		RouterModule.forRoutes([
			{ path: '/help-center-article', module: HelpCenterArticleModule }
		]),
		forwardRef(() => TypeOrmModule.forFeature([HelpCenterArticle])),
		forwardRef(() => TenantModule),
		forwardRef(() => UserModule),
		CqrsModule
	],
	providers: [HelpCenterArticleService, ...CommandHandlers],
	controllers: [HelpCenterArticleController],
	exports: [HelpCenterArticleService]
})
export class HelpCenterArticleModule implements OnModuleInit {
	constructor() {}

	onModuleInit() {}
}
