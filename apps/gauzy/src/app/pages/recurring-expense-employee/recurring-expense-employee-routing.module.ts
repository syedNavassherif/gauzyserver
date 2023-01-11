import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateRangePickerResolver } from '../../@theme/components/header/selectors/date-range-picker';
import { RecurringExpensesEmployeeComponent } from './recurring-expense-employee.component';

const routes: Routes = [
	{
		path: '',
		component: RecurringExpensesEmployeeComponent,
		data: {
			selectors: {
				project: false
			},
			datePicker: {
				unitOfTime: 'month'
			}
		},
		runGuardsAndResolvers: 'always',
		resolve: {
			dates: DateRangePickerResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RecurringExpensesEmployeeRoutingModule {}
