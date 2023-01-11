import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogModule,
	NbIconModule,
	NbInputModule,
	NbRouteTabsetModule,
	NbSelectModule,
	NbSpinnerModule,
	NbTooltipModule,
	NbRadioModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrganizationsService } from '../../@core/services/organizations.service';
import { ThemeModule } from '../../@theme/theme.module';
import { TimeOffComponent } from './time-off.component';
import { TimeOffRoutingModule } from './time-off-routing.module';
import { TimeOffSettingsComponent } from './time-off-settings/time-off-settings.component';
import { TimeOffMutationModule } from '../../@shared/time-off/time-off-mutation.module';
import { TimeOffService } from '../../@core/services/time-off.service';
import { UserFormsModule } from '../../@shared/user/forms/user-forms.module';
import { RequestApprovalIcon } from './table-components/request-approval-icon';
import { PaidIcon } from './table-components/paid-icon';
import { SharedModule } from '../../@shared/shared.module';
import { CardGridModule } from './../../@shared/card-grid/card-grid.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { NbToggleModule } from '@nebular/theme';

@NgModule({
	imports: [
		SharedModule,
		TimeOffRoutingModule,
		ThemeModule,
		UserFormsModule,
		NbCardModule,
		FormsModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbIconModule,
		Ng2SmartTableModule,
		NbDialogModule.forChild(),
		NbTooltipModule,
		NgSelectModule,
		NbRadioModule,
		NbSelectModule,
		NbBadgeModule,
		CardGridModule,
		NbRouteTabsetModule,
		NbCheckboxModule,
		TranslateModule,
		NbSpinnerModule,
		TimeOffMutationModule,
		NgxPermissionsModule.forChild(),
		HeaderTitleModule,
		GauzyButtonActionModule,
		PaginationModule,
    NbToggleModule
	],
	declarations: [
		TimeOffComponent,
		TimeOffSettingsComponent,
		RequestApprovalIcon,
		PaidIcon
	],
	providers: [OrganizationsService, TimeOffService]
})
export class TimeOffModule {}
