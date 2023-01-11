import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IEmployee, IEmployeeAppointment } from '@gauzy/contracts';
import { EmployeeAppointmentService, EmployeesService } from '../../../@core/services';
import { TranslationBaseComponent } from '../../../@shared/language-base/translation-base.component';
import { AlertModalComponent } from '../../../@shared/alert-modal/alert-modal.component';

@UntilDestroy({ checkProperties: true })
@Component({
	templateUrl: './confirm-appointment.component.html'
})
export class ConfirmAppointmentComponent extends TranslationBaseComponent
	implements OnInit, OnDestroy {

	loading: boolean = true;
	employee: IEmployee;
	appointment: IEmployeeAppointment;
	participants: string;
	duration: string;
	editLink: string;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly dialogService: NbDialogService,
		private readonly employeeService: EmployeesService,
		private readonly employeeAppointmentService: EmployeeAppointmentService,
		readonly translateService: TranslateService
	) {
		super(translateService);
	}

	ngOnInit(): void {
		this.route.params
			.pipe(
				untilDestroyed(this)
			)
			.subscribe(async (params) => {
				const appointmentId = params.appointmentId;
				const employeeId = params.id;
				if (employeeId && appointmentId) {
					this.loadAppointment(appointmentId, employeeId);
					const token = await this.employeeAppointmentService.signAppointmentId(
						appointmentId
					);
					this.editLink = `/share/employee/edit-appointment?token=${token}`;
					this.loading = false;
				} else {
					this.router.navigate(['/share/404']);
				}
			});
	}

	async loadAppointment(appointmentId: string, employeeId: string = '') {
		this.appointment = await firstValueFrom(this.employeeAppointmentService
			.getById(appointmentId)
		);

		if (employeeId) {
			this.employee = await firstValueFrom(this.employeeService.getEmployeeById(
				employeeId,
				['user']
			));
		}

		this.duration = `${moment(this.appointment.startDateTime).format(
			'llll'
		)} - ${moment(this.appointment.endDateTime).format('llll')}`;
	}

	async cancelAppointment(appointmentId: string) {
		const dialog = this.dialogService.open(AlertModalComponent, {
			context: {
				alertOptions: {
					title: this.getTranslation(
						'APPOINTMENTS_PAGE.CANCEL_APPOINTMENT'
					),
					message: this.getTranslation(
						'APPOINTMENTS_PAGE.ARE_YOU_SURE'
					),
					status: 'danger'
				}
			}
		});
		const response = await firstValueFrom(dialog.onClose);
		if (!!response) {
			if (response === 'yes') {
				await this.employeeAppointmentService.update(appointmentId, {
					status: 'Cancelled'
				});
				this.loadAppointment(appointmentId);
			}
		}
	}

	ngOnDestroy() {}
}
