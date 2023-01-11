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
	NbTooltipModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClipboardModule } from 'ngx-clipboard';
import { ThemeModule } from '../../../@theme/theme.module';
import { InviteMutationModule } from '../invite-mutation/invite-mutation.module';
import { InvitesComponent } from './invites.component';
import { ProjectNamesComponent } from './project-names/project-names.component';
import { UserFormsModule } from '../../user/forms/user-forms.module';
import { ResendConfirmationComponent } from './resend-confirmation/resend-confirmation.component';
import { ClientNamesComponent } from './client-names/client-names.component';
import { DepartmentNamesComponent } from './department-names/department-names.component';
import { SharedModule } from '../../shared.module';
import { CardGridModule } from '../../card-grid/card-grid.module';
import { TranslateModule } from '../../translate/translate.module';
import { HeaderTitleModule } from '../../components/header-title/header-title.module';
import { GauzyButtonActionModule } from '../../gauzy-button-action/gauzy-button-action.module';
import { PaginationModule } from '../../pagination/pagination.module';

const COMPONENTS = [
	InvitesComponent,
	ProjectNamesComponent,
	ClientNamesComponent,
	DepartmentNamesComponent,
	ResendConfirmationComponent
];

@NgModule({
	imports: [
		SharedModule,
		ThemeModule,
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
		NbSelectModule,
		NbBadgeModule,
		NbRouteTabsetModule,
		NbCheckboxModule,
		ClipboardModule,
		TranslateModule,
		NbSpinnerModule,
		InviteMutationModule,
		UserFormsModule,
		CardGridModule,
		HeaderTitleModule,
		GauzyButtonActionModule,
		PaginationModule,
	],
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS],
	providers: []
})
export class InviteTableModule {}
