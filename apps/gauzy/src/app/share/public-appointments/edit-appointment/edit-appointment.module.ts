import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { EditAppointmentComponent } from './edit-appointment.component';
import { EditAppointmentRoutingModule } from './edit-appointment.routing.module';
import { NbCardModule, NbSpinnerModule, NbButtonModule } from '@nebular/theme';
import { EmployeeAppointmentService } from '../../../@core/services/employee-appointment.service';
import { ManageAppointmentModule } from '../../../pages/employees/appointment/manage-appointment/manage-appointment.module';
import { TranslateModule } from '../../../@shared/translate/translate.module';

@NgModule({
	imports: [
		ThemeModule,
		NbButtonModule,
		NbSpinnerModule,
		NbCardModule,
		EditAppointmentRoutingModule,
		ManageAppointmentModule,
		TranslateModule
	],
	declarations: [EditAppointmentComponent],
	providers: [EmployeeAppointmentService]
})
export class EditAppointmentModule {}
