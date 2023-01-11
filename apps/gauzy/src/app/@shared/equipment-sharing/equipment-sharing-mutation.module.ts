import { NgModule } from '@angular/core';
import {
	NbIconModule,
	NbCardModule,
	NbButtonModule,
	NbInputModule,
	NbSelectModule,
	NbCheckboxModule,
	NbDatepickerModule,
	NbRadioModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { EquipmentSharingMutationComponent } from './equipment-sharing-mutation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '../translate/translate.module';
import { EmployeeMultiSelectModule } from '../employee/employee-multi-select/employee-multi-select.module';
import { EquipmentService, EquipmentSharingPolicyService, EquipmentSharingService, Store } from '../../@core/services';

@NgModule({
	imports: [
		ThemeModule,
		FormsModule,
		NbCardModule,
		NbIconModule,
		NbCheckboxModule,
		ReactiveFormsModule,
		FormsModule,
		NbButtonModule,
		NbInputModule,
		NbSelectModule,
		NbDatepickerModule,
		NgSelectModule,
		NbRadioModule,
		TranslateModule,
		EmployeeMultiSelectModule
	],
	declarations: [EquipmentSharingMutationComponent],
	providers: [
		EquipmentSharingService,
		Store,
		EquipmentService,
		EquipmentSharingPolicyService
	]
})
export class EquipmentSharingMutationModule {}
