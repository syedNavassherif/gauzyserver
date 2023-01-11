import { IHelpCenterAuthor } from '@gauzy/contracts';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { isNotEmpty } from '@gauzy/common';
import { HelpCenterAuthor } from './help-center-author.entity';

@Injectable()
export class HelpCenterAuthorService extends TenantAwareCrudService<HelpCenterAuthor> {
	constructor(
		@InjectRepository(HelpCenterAuthor)
		private readonly helpCenterAuthorRepository: Repository<HelpCenterAuthor>
	) {
		super(helpCenterAuthorRepository);
	}

	async findByArticleId(articleId: string): Promise<HelpCenterAuthor[]> {
		return await this.repository
			.createQueryBuilder('knowledge_base_author')
			.where('knowledge_base_author.articleId = :articleId', {
				articleId
			})
			.getMany();
	}

	async createBulk(createInput: IHelpCenterAuthor[]) {
		return await this.repository.save(createInput);
	}

	async deleteBulkByArticleId(ids: string[]) {
		if (isNotEmpty(ids)) {
			return await this.repository.delete(ids);
		}
	}

	async getAll(): Promise<IHelpCenterAuthor[]> {
		return await this.repository
			.createQueryBuilder('knowledge_base_author')
			.getMany();
	}
}
