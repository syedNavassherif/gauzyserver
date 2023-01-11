import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
	IEquipment,
	ComponentLayoutStyleEnum,
	IOrganization
} from '@gauzy/contracts';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { debounceTime, firstValueFrom, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChange } from '@gauzy/common-angular';
import { EquipmentMutationComponent } from '../../@shared/equipment/equipment-mutation.component';
import {
	IPaginationBase,
	PaginationFilterBaseComponent
} from '../../@shared/pagination/pagination-filter-base.component';
import { DeleteConfirmationComponent } from '../../@shared/user/forms';
import { AutoApproveComponent } from './auto-approve/auto-approve.component';
import {
	PictureNameTagsComponent,
	TagsOnlyComponent
} from '../../@shared/table-components';
import { API_PREFIX, ComponentEnum } from '../../@core/constants';
import { EquipmentService, Store, ToastrService } from '../../@core/services';
import { ImageRowComponent } from '../inventory/components/inventory-table-components';
import { ServerDataSource } from '../../@core/utils/smart-table';
import { InputFilterComponent } from '../../@shared/table-filters';

@UntilDestroy({ checkProperties: true })
@Component({
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent
	extends PaginationFilterBaseComponent
	implements OnInit, OnDestroy
{
	settingsSmartTable: object;
	loading: boolean = true;
	disableButton: boolean = true;
	selectedEquipment: IEquipment;
	smartTableSource: ServerDataSource;
	equipments: IEquipment[] = [];
	viewComponentName: ComponentEnum;
	dataLayoutStyle = ComponentLayoutStyleEnum.TABLE;
	componentLayoutStyleEnum = ComponentLayoutStyleEnum;

	public organization: IOrganization;
	equipments$: Subject<any> = this.subject$;
	private _refresh$: Subject<any> = new Subject();

	equipmentTable: Ng2SmartTableComponent;
	@ViewChild('equipmentTable') set content(content: Ng2SmartTableComponent) {
		if (content) {
			this.equipmentTable = content;
			this.onChangedSource();
		}
	}

	constructor(
		public readonly translateService: TranslateService,
		private readonly dialogService: NbDialogService,
		private readonly equipmentService: EquipmentService,
		private readonly toastrService: ToastrService,
		private readonly store: Store,
		private readonly http: HttpClient,
		private readonly route: ActivatedRoute
	) {
		super(translateService);
		this.setView();
	}

	ngOnInit(): void {
		this._loadSmartTableSettings();
		this._applyTranslationOnSmartTable();
		this.equipments$
			.pipe(
				debounceTime(100),
				tap(() => this.clearItem()),
				tap(() => this.getEquipments()),
				untilDestroyed(this)
			)
			.subscribe();
		this.pagination$
			.pipe(
				debounceTime(100),
				distinctUntilChange(),
				tap(() => this.equipments$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
		this.store.selectedOrganization$
			.pipe(
				distinctUntilChange(),
				filter((organization: IOrganization) => !!organization),
				tap(
					(organization: IOrganization) =>
						(this.organization = organization)
				),
				tap(() => this._refresh$.next(true)),
				tap(() => this.equipments$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
		this.route.queryParamMap
			.pipe(
				filter(
					(params) =>
						!!params && params.get('openAddDialog') === 'true'
				),
				debounceTime(1000),
				tap(() => this.save()),
				untilDestroyed(this)
			)
			.subscribe();
		this._refresh$
			.pipe(
				filter(
					() =>
						this.dataLayoutStyle ===
						ComponentLayoutStyleEnum.CARDS_GRID
				),
				tap(() => this.refreshPagination()),
				tap(() => (this.equipments = [])),
				untilDestroyed(this)
			)
			.subscribe();
	}

	ngOnDestroy(): void {}

	setView() {
		this.viewComponentName = ComponentEnum.EQUIPMENT;
		this.store
			.componentLayout$(this.viewComponentName)
			.pipe(
				distinctUntilChange(),
				tap(
					(componentLayout) =>
						(this.dataLayoutStyle = componentLayout)
				),
				tap(() => this.refreshPagination()),
				filter(
					(componentLayout) =>
						componentLayout === ComponentLayoutStyleEnum.CARDS_GRID
				),
				tap(() => (this.equipments = [])),
				tap(() => this.equipments$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
	}

	/*
	 * Table on changed source event
	 */
	onChangedSource() {
		this.equipmentTable.source.onChangedSource
			.pipe(
				untilDestroyed(this),
				tap(() => this.clearItem())
			)
			.subscribe();
	}

	private _loadSmartTableSettings() {
		const pagination: IPaginationBase = this.getPagination();
		this.settingsSmartTable = {
			actions: false,
			pager: {
				display: false,
				perPage: pagination ? pagination.itemsPerPage : 10
			},
			noDataMessage: this.getTranslation('SM_TABLE.NO_DATA.EQUIPMENT'),
			columns: {
				image: {
					title: this.getTranslation('INVENTORY_PAGE.IMAGE'),
					width: '79px',
					filter: false,
					type: 'custom',
					renderComponent: ImageRowComponent
				},
				name: {
					title: this.getTranslation('EQUIPMENT_PAGE.EQUIPMENT_NAME'),
					type: 'custom',
					renderComponent: PictureNameTagsComponent,
					filter: {
						type: 'custom',
						component: InputFilterComponent
					},
					filterFunction: (value) => {
						this.setFilter({ field: 'name', search: value });
					}
				},
				type: {
					title: this.getTranslation('EQUIPMENT_PAGE.EQUIPMENT_TYPE'),
					type: 'string',
					filter: {
						type: 'custom',
						component: InputFilterComponent
					},
					filterFunction: (value) => {
						this.setFilter({ field: 'type', search: value });
					}
				},
				serialNumber: {
					title: this.getTranslation('EQUIPMENT_PAGE.EQUIPMENT_SN'),
					type: 'string',
					filter: {
						type: 'custom',
						component: InputFilterComponent
					},
					filterFunction: (value) => {
						this.setFilter({
							field: 'serialNumber',
							search: value
						});
					}
				},
				manufacturedYear: {
					title: this.getTranslation(
						'EQUIPMENT_PAGE.EQUIPMENT_MANUFACTURED_YEAR'
					),
					type: 'number',
					filter: false
				},
				initialCost: {
					title: this.getTranslation(
						'EQUIPMENT_PAGE.EQUIPMENT_INITIAL_COST'
					),
					type: 'number',
					filter: false
				},
				currency: {
					title: this.getTranslation(
						'EQUIPMENT_PAGE.EQUIPMENT_CURRENCY'
					),
					type: 'string',
					filter: false
				},
				maxSharePeriod: {
					title: this.getTranslation(
						'EQUIPMENT_PAGE.EQUIPMENT_MAX_SHARE_PERIOD'
					),
					type: 'number',
					filter: false
				},
				autoApproveShare: {
					title: this.getTranslation(
						'EQUIPMENT_PAGE.EQUIPMENT_AUTO_APPROVE'
					),
					type: 'custom',
					filter: false,
					renderComponent: AutoApproveComponent
				},
				tags: {
					title: this.getTranslation('SM_TABLE.TAGS'),
					type: 'custom',
					filter: false,
					renderComponent: TagsOnlyComponent
				}
			}
		};
	}

	async save(selectedItem?: IEquipment) {
		if (selectedItem) {
			this.selectEquipment({
				isSelected: true,
				data: selectedItem
			});
		} else {
			this.selectEquipment({
				isSelected: false,
				data: null
			});
		}
		const dialog = this.dialogService.open(EquipmentMutationComponent, {
			context: {
				equipment: this.selectedEquipment
			}
		});
		const equipment = await firstValueFrom(dialog.onClose);
		if (equipment) {
			this.toastrService.success('EQUIPMENT_PAGE.EQUIPMENT_SAVED', {
				name: equipment.name
			});
			this._refresh$.next(true);
			this.equipments$.next(true);
		}
	}

	async delete(selectedItem?: IEquipment) {
		if (selectedItem) {
			this.selectEquipment({
				isSelected: true,
				data: selectedItem
			});
		}
		const result = await firstValueFrom(
			this.dialogService.open(DeleteConfirmationComponent).onClose
		);

		if (result) {
			await this.equipmentService.delete(this.selectedEquipment.id);
			this._refresh$.next(true);
			this.equipments$.next(true);
			this.toastrService.success('EQUIPMENT_PAGE.EQUIPMENT_DELETED', {
				name: this.selectedEquipment.name
			});
		}
	}

	/*
	 * Register Smart Table Source Config
	 */
	setSmartTableSource() {
		if (!this.organization) {
			return;
		}
		this.loading = true;

		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		this.smartTableSource = new ServerDataSource(this.http, {
			endPoint: `${API_PREFIX}/equipment/pagination`,
			relations: ['equipmentSharings', 'tags', 'image'],
			where: {
				...{ organizationId, tenantId },
				...this.filters.where
			},
			finalize: () => {
				if (
					this.dataLayoutStyle === ComponentLayoutStyleEnum.CARDS_GRID
				) {
					this.equipments.push(...this.smartTableSource.getData());
				}
				this.setPagination({
					...this.getPagination(),
					totalItems: this.smartTableSource.count()
				});
				this.loading = false;
			}
		});
	}

	async getEquipments() {
		if (!this.organization) {
			return;
		}
		try {
			this.setSmartTableSource();

			const { activePage, itemsPerPage } = this.getPagination();
			this.smartTableSource.setPaging(activePage, itemsPerPage, false);

			if (this.dataLayoutStyle === ComponentLayoutStyleEnum.CARDS_GRID) {
				await this.smartTableSource.getElements();
			}
		} catch (error) {
			this.toastrService.danger(error);
		}
	}

	selectEquipment({ isSelected, data }) {
		this.disableButton = !isSelected;
		this.selectedEquipment = isSelected ? data : null;
	}

	/*
	 * Clear selected item
	 */
	clearItem() {
		this.selectEquipment({
			isSelected: false,
			data: null
		});
		this.deselectAll();
	}
	/*
	 * Deselect all table rows
	 */
	deselectAll() {
		if (this.equipmentTable && this.equipmentTable.grid) {
			this.equipmentTable.grid.dataSet['willSelect'] = 'false';
			this.equipmentTable.grid.dataSet.deselectAll();
		}
	}

	_applyTranslationOnSmartTable() {
		this.translateService.onLangChange
			.pipe(
				tap(() => this._loadSmartTableSettings()),
				untilDestroyed(this)
			)
			.subscribe();
	}
}
