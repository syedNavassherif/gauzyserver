import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnDestroy
} from '@angular/core';
import { ITag, IOrganization } from '@gauzy/contracts';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs/operators';
import { Store, TagsService } from '../../../@core/services';
import { PictureNameTagsComponent } from '../../table-components';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-tags-color-input',
	templateUrl: './tags-color-input.component.html',
	styleUrls: ['./tags-color-input.component.scss']
})
export class TagsColorInputComponent
	extends PictureNameTagsComponent
	implements OnInit, OnDestroy
{
	tags: ITag[] = [];
	loading: boolean;
	private organization: IOrganization;

	@Input('isOrgLevel')
	isOrgLevel: boolean = false;

	@Input('isTenantLevel')
	isTenantLevel: boolean = false;

	@Input('selectedTags')
	selectedTags: ITag[];

	selectedTagIds: string[];

	@Output()
	selectedTagsEvent = new EventEmitter<ITag[]>();

	/*
	* Getter & Setter for multiple selection
	*/
	_multiple: boolean = true;
	get multiple(): boolean {
		return this._multiple;
	}
	@Input() set multiple(value: boolean) {
		this._multiple = value;
	}

	/*
	* Getter & Setter for display label
	*/
	_label: boolean = true;
	get label(): boolean {
		return this._label;
	}
	@Input() set label(value: boolean) {
		this._label = value;
	}

	constructor(
		private readonly tagsService: TagsService,
		private readonly store: Store,
		readonly themeService: NbThemeService,
		readonly translateService: TranslateService
	) {
		super(themeService, translateService);
	}

	async onChange(currentSelection: string[]) {
		const selectedTags = this.tags.filter((tag) =>
			currentSelection.includes(tag.id)
		);
		this.selectedTagsEvent.emit(selectedTags);
	}

	addTag = async (tagName: string) => {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		const tag: ITag = {
			name: tagName,
			color: '#' + Math.floor(Math.random() * 16777215).toString(16),
			description: ''		
		};

		if (this.isTenantLevel || this.isOrgLevel) { tag['tenantId'] = tenantId; }
		if (this.isOrgLevel) { tag['organizationId'] = organizationId; }

		this.loading = true;
		return await this.tagsService.insertTag(tag)
			.finally(() => {
				this.loading = false
			});
	};

	ngOnInit() {
		this.store.selectedOrganization$
			.pipe(
				filter((organization: IOrganization) => !!organization),
				tap((organization: IOrganization) => this.organization = organization),
				tap(() => this.getAllTags()),
				untilDestroyed(this)
			)
			.subscribe();
		this.selectedTagIds = this.selectedTagIds? this.selectedTags?.map((tag: ITag) => tag.id): null;
	}

	async getAllTags() {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		if (this.isOrgLevel) {
			const { items } = await this.tagsService.getTagsByLevel(
				{ organizationId, tenantId },
				['organization']
			);
			this.tags = items;
		}

		if (this.isTenantLevel) {
			const { items } = await this.tagsService.getTagsByLevel(
				{ tenantId },
				['tenant']
			);
			this.tags = items;
		}
	}

	ngOnDestroy() {}
}
