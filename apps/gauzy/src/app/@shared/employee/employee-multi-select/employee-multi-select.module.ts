import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { EmployeeSelectComponent } from './employee-multi-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '../../translate/translate.module';

@NgModule({
	imports: [
		ThemeModule,
		NbSelectModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
		TranslateModule
	],
	declarations: [EmployeeSelectComponent],
	exports: [EmployeeSelectComponent],
	providers: []
})
export class EmployeeMultiSelectModule {}
