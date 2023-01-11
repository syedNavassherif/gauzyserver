import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbActionsModule,
	NbButtonModule,
	NbCardModule,
	NbIconModule,
	NbSelectModule,
	NbInputModule
} from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { SharedModule } from '../../shared.module';
import { EmployeeRatesComponent } from './employee-rates.component';
import { CurrencyModule } from '../../currency/currency.module';
import { TranslateModule } from '../../translate/translate.module';
import { CandidateStore, EmployeeStore } from '../../../@core/services';

@NgModule({
	imports: [
		ThemeModule,
		FormsModule,
		ReactiveFormsModule,
		NbCardModule,
		NbButtonModule,
		NbInputModule,
		NbSelectModule,
		NbIconModule,
		SharedModule,
		ThemeModule,
		NbActionsModule,
		TranslateModule,
		CurrencyModule
	],
	exports: [EmployeeRatesComponent],
	declarations: [EmployeeRatesComponent],
	providers: [CandidateStore, EmployeeStore]
})
export class EmployeeRatesModule {}
