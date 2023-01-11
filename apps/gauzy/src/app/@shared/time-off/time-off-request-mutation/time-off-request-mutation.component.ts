import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NbDateService, NbDialogRef } from '@nebular/theme';
import {
	IEmployee,
	ITimeOffPolicy,
	ITimeOff,
	IOrganization,
	StatusTypesEnum
} from '@gauzy/contracts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter, first, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChange, isNotEmpty } from '@gauzy/common-angular';
import { EmployeeSelectorComponent } from '../../../@theme/components/header/selectors/employee/employee.component';
import {
	OrganizationDocumentsService,
	Store,
} from '../../../@core/services';
import { CompareDateValidator } from '../../../@core/validators';
import { FormHelpers } from '../../forms/helpers';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ngx-time-off-request-mutation',
	templateUrl: './time-off-request-mutation.component.html',
	styleUrls: ['../time-off-mutation.components.scss']
})
export class TimeOffRequestMutationComponent implements OnInit {

	FormHelpers: typeof FormHelpers = FormHelpers;

	constructor(
		protected readonly dialogRef: NbDialogRef<TimeOffRequestMutationComponent>,
		private readonly fb: FormBuilder,
		private readonly documentsService: OrganizationDocumentsService,
		private readonly store: Store,
    	private dateService: NbDateService<Date>
	) {
    	this.minDate = this.dateService.addMonth(this.dateService.today(),0);
  	}

	/**
	 * Employee Selector
	 */
	employeeSelector: EmployeeSelectorComponent;
	@ViewChild('employeeSelector', { static: false }) set content(component: EmployeeSelectorComponent) {
		if (component) {
			this.employeeSelector = component;
		}
	}

	@Input() type: string;

	/*
	* Getter & Setter
	*/
	_timeOff: ITimeOff;
	get timeOff(): ITimeOff {
		return this._timeOff;
	}
	@Input() set timeOff(value: ITimeOff) {
		this._timeOff = value;
	};

	employeesArr: IEmployee[] = [];
	selectedEmployee: any;
	isEditMode = false;
	minDate : Date;
	public organization: IOrganization;

	/*
	* Time Off Request Mutation Form
	*/
	public form: FormGroup = TimeOffRequestMutationComponent.buildForm(this.fb);
	static buildForm(fb: FormBuilder): FormGroup {
		const form = fb.group({
			start: ['', Validators.required],
			end: ['', Validators.required],
			policy: ['', Validators.required],
			policyId: ['', Validators.required],
			documentUrl: [],
			status: [],
			description: []
		}, {
			validators: [
				CompareDateValidator.validateDate('start', 'end')
			]
		});
		return form;
	}

	ngOnInit() {
		this.store.selectedOrganization$
			.pipe(
				debounceTime(200),
				distinctUntilChange(),
				filter((organization: IOrganization) => !!organization),
				tap((organization) => this.organization = organization),
				tap(() => this.patchFormValue()),
				untilDestroyed(this)
			)
			.subscribe();
	}

	/**
	 * Patch form value on edit section
	 */
	patchFormValue() {
		// patch form value
		if (this.timeOff) {
			this.form.patchValue({
				start: this.timeOff.start,
				end: this.timeOff.end,
				description: this.timeOff.description,
				policy: this.timeOff.policy,
				policyId: this.timeOff.policyId,
				status: this.timeOff.status,
				documentUrl: this.timeOff.documentUrl
			});

			this.selectedEmployee = this.timeOff['employees'][0];
			this.employeesArr = this.timeOff['employees'];
		}
	}

	saveRequest() {
		this.selectedEmployee = this.employeeSelector.selectedEmployee;
		if (this.selectedEmployee.id) {
			this.employeesArr.push(this.selectedEmployee);
			this._createNewRecord();
		}
	}

	getRequestForm(reqType: string) {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		this.documentsService
			.getAll({ tenantId, organizationId })
			.pipe(first())
			.subscribe(({ items }) => {
				if (isNotEmpty(items)) {
					let downloadDocUrl: string;
					if (reqType === 'paid') {
						downloadDocUrl = items[0].documentUrl;
					} else {
						downloadDocUrl = items[1].documentUrl;
					}
					window.open(`${downloadDocUrl}`);
				}
			});
	}

	private _createNewRecord() {
		if (this.form.invalid) {
			return;
		}
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.organization;

		this.dialogRef.close(
			Object.assign(
				{
					employees: this.employeesArr,
					organizationId,
					tenantId,
					isHoliday: false,
					requestDate: new Date()
				},
				this.form.getRawValue()
			)
		);
	}

	/**
	 * On Policy Selection
	 *
	 * @param policy
	 */
	onPolicySelected(policy: ITimeOffPolicy) {
		this.form.get('policy').setValue(policy);
		if (policy.requiresApproval) {
			this.form.get('status').setValue(StatusTypesEnum.REQUESTED);
		} else {
			this.form.get('status').setValue(StatusTypesEnum.APPROVED);
		}
		this.form.updateValueAndValidity();
	}

	close() {
		this.dialogRef.close();
	}
}
