import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IEmployee,
	IEmployeeJobsStatisticsResponse,
	IOrganization
} from '@gauzy/contracts';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChange } from '@gauzy/common-angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { EmployeeLinksComponent } from './../../../../@shared/table-components';
import { IPaginationBase, PaginationFilterBaseComponent } from './../../../../@shared/pagination/pagination-filter-base.component';
import { EmployeesService, Store, ToastrService } from './../../../../@core/services';
import { SmartTableToggleComponent } from './../../../../@shared/smart-table/smart-table-toggle/smart-table-toggle.component';
import { ServerDataSource } from './../../../../@core/utils/smart-table';
import { API_PREFIX } from './../../../../@core/constants';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ga-job-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends PaginationFilterBaseComponent
	implements AfterViewInit, OnInit, OnDestroy {

	loading: boolean = false;
	settingsSmartTable: any;

	employees$: Subject<any> = new Subject();
	smartTableSource: ServerDataSource;
	organization: IOrganization;

	constructor(
		private readonly httpClient: HttpClient,
		private readonly store: Store,
		public readonly translateService: TranslateService,
		private readonly employeesService: EmployeesService,
		private readonly toastrService: ToastrService
	) {
		super(translateService);
	}

	ngOnInit(): void {
		this._applyTranslationOnSmartTable();
		this._loadSmartTableSettings();
	}

	ngAfterViewInit(): void {
		this.employees$
			.pipe(
				debounceTime(100),
				tap(() => this._getEmployees()),
				untilDestroyed(this)
			)
			.subscribe();
		this.pagination$
			.pipe(
				debounceTime(100),
				distinctUntilChange(),
				tap(() => this.employees$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
		this.store.selectedOrganization$
			.pipe(
				distinctUntilChange(),
				filter((organization: IOrganization) => !!organization),
				tap((organization: IOrganization) => this.organization = organization),
				tap(() => this.employees$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
	}

	private _getEmployees() {
		if (!this.organization) {
			return;
		}
		try {
			this.loading = true;

			const { tenantId } = this.store.user;
			const { id: organizationId } = this.organization;

			this.smartTableSource = new ServerDataSource(this.httpClient, {
				endPoint: `${API_PREFIX}/employee/job-statistics`,
				relations: ['user'],
				where: {
					tenantId,
					organizationId,
					isActive: true,
					...(this.filters.where ? this.filters.where : {})
				},
				finalize: () => {
					this.setPagination({
						...this.getPagination(),
						totalItems: this.smartTableSource.count()
					});
					this.loading = false;
				}
			});
			const { activePage, itemsPerPage } = this.getPagination();
			this.smartTableSource.setPaging(activePage, itemsPerPage, false);
		} catch (error) {
			this.toastrService.danger(error);
		}
	}

	private _loadSmartTableSettings() {
		const pagination: IPaginationBase = this.getPagination();
		this.settingsSmartTable = {
			selectedRowIndex: -1,
			editable: false,
			actions: false,
			hideSubHeader: true,
			noDataMessage: this.getTranslation('SM_TABLE.NO_DATA.EMPLOYEE'),
			pager: {
				display: false,
				perPage: pagination ? pagination.itemsPerPage : 10
			},
			columns: {
				employeeId: {
					title: this.getTranslation('JOB_EMPLOYEE.EMPLOYEE'),
					width: '40%',
					type: 'custom',
					sort: false,
					renderComponent: EmployeeLinksComponent,
					valuePrepareFunction: (
						cell,
						row: IEmployeeJobsStatisticsResponse
					) => {
						return {
							name: row.user ? row.user.name : null,
							imageUrl: row.user ? row.user.imageUrl : null,
							id: row.id
						};
					}
				},
				availableJobs: {
					title: this.getTranslation('JOB_EMPLOYEE.AVAILABLE_JOBS'),
					type: 'text',
					width: '20%',
					sort: false,
					valuePrepareFunction: (
						cell,
						row: IEmployeeJobsStatisticsResponse
					) => {
						return row.availableJobs || 0;
					}
				},
				appliedJobs: {
					title: this.getTranslation('JOB_EMPLOYEE.APPLIED_JOBS'),
					type: 'html',
					width: '20%',
					sort: false,
					valuePrepareFunction: (
						cell,
						row: IEmployeeJobsStatisticsResponse
					) => {
						return row.appliedJobs || 0;
					}
				},
				isJobSearchActive: {
					title: this.getTranslation(
						'JOB_EMPLOYEE.JOB_SEARCH_STATUS'
					),
					type: 'custom',
					width: '20%',
					renderComponent: SmartTableToggleComponent,
					valuePrepareFunction: (
						cell,
						row: IEmployeeJobsStatisticsResponse
					) => {
						return {
							checked: row.isJobSearchActive,
							onChange: (toggleValue: boolean) => this.updateJobSearchAvailability(
								row,
								toggleValue
							)
						};
					}
				}
			}
		};
	}

	async updateJobSearchAvailability(
		employee: IEmployee,
		isJobSearchActive: boolean
	): Promise<void> {
		if (!this.organization) {
			return;
		}
		try {
			const { tenantId } = this.store.user;
			const { id: organizationId } = this.organization;

			await this.employeesService.updateJobSearchStatus(employee.id, {
				isJobSearchActive,
				organizationId,
				tenantId
			}).then(() => {
				if (isJobSearchActive) {
					this.toastrService.success('TOASTR.MESSAGE.EMPLOYEE_JOB_STATUS_ACTIVE', {
						name: employee.fullName.trim()
					});
				} else {
					this.toastrService.success('TOASTR.MESSAGE.EMPLOYEE_JOB_STATUS_INACTIVE', {
						name: employee.fullName.trim()
					});
				}
			});
		} catch (error) {
			this.toastrService.danger(error);
		}
	}

	private _applyTranslationOnSmartTable() {
		this.translateService.onLangChange
			.pipe(
				tap(() => this._loadSmartTableSettings()),
				untilDestroyed(this)
			)
			.subscribe();
	}

	public handleGridSelected({ isSelected, data }): void {}

	ngOnDestroy(): void {}
}
