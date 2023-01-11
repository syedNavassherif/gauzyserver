import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {
	NbCardModule,
	NbButtonModule,
	NbInputModule,
	NbIconModule,
	NbDialogModule,
	NbTooltipModule,
	NbBadgeModule,
	NbSelectModule,
	NbRouteTabsetModule,
	NbSpinnerModule,
	NbSidebarModule,
	NbLayoutModule,
	NbActionsModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { OrganizationsService } from '../../@core/services/organizations.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserMutationModule } from '../../@shared/user/user-mutation/user-mutation.module';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { EditUserMutationComponent } from './edit-user-mutation/edit-user-mutation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageUploaderModule } from '../../@shared/image-uploader/image-uploader.module';
import { UsersOrganizationsService } from '../../@core/services/users-organizations.service';
import { EditProfileFormModule } from '../../@shared/user/edit-profile-form/edit-profile-form.module';
import { InviteMutationModule } from '../../@shared/invite/invite-mutation/invite-mutation.module';
import { ManageUserInviteComponent } from './manage-user-invite/manage-user-invite.component';
import { InviteTableModule } from '../../@shared/invite/invites/invites.module';
import { InviteGuard } from '../../@core/guards';
import { UserMultiSelectModule } from '../../@shared/user/user-multi-select/user-multi-select.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { EditUserOrganizationsComponent } from './edit-user-profile/edit-user-organizations/edit-user-organizations.component';
import { EditEmployeeMembershipFormModule } from '../../@shared/employee/edit-employee-membership-form/edit-employee-membership-form.module';
import { EditUserDataComponent } from './edit-user-profile/edit-user-data/edit-user-data.component';
import { UserOrganizationsMultiSelectModule } from '../../@shared/user/user-organizations-multi-select/user-organizations-multi-select.module';
import { EditUserOrganizationsMutationComponent } from './edit-user-profile/edit-user-organizations/edit-user-organizations-mutation/edit-user-organizations-mutation.component';
import { UserIdService } from '../../@core/services/edit-user-data.service';
import { TableComponentsModule } from '../../@shared/table-components/table-components.module';
import { TagsColorInputModule } from '../../@shared/tags/tags-color-input/tags-color-input.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { CardGridModule } from '../../@shared/card-grid/card-grid.module';
import { SharedModule } from '../../@shared/shared.module';

const COMPONENTS = [
	UsersComponent,
	EditUserProfileComponent,
	ManageUserInviteComponent,
	EditUserMutationComponent,
	EditUserOrganizationsComponent,
	EditUserDataComponent,
	EditUserOrganizationsMutationComponent
];

@NgModule({
	imports: [
		TagsColorInputModule,
		TableComponentsModule,
		NbSidebarModule,
		NbLayoutModule,
		UsersRoutingModule,
		UserMultiSelectModule,
		UserOrganizationsMultiSelectModule,
		OrganizationsModule,
		NbActionsModule,
		ThemeModule,
		NbCardModule,
		FormsModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbIconModule,
		Ng2SmartTableModule,
		NbDialogModule.forChild(),
		UserMutationModule,
		NbTooltipModule,
		NgSelectModule,
		NbSelectModule,
		ImageUploaderModule,
		NbBadgeModule,
		NbRouteTabsetModule,
		TranslateModule,
		NbSpinnerModule,
		EditProfileFormModule,
		InviteMutationModule,
		InviteTableModule,
		EditEmployeeMembershipFormModule,
		NgxPermissionsModule.forChild(),
		HeaderTitleModule,
		GauzyButtonActionModule,
		PaginationModule,
		CardGridModule,
		SharedModule
	],
	declarations: [...COMPONENTS],
	providers: [
		OrganizationsService,
		UsersOrganizationsService,
		InviteGuard,
		UserIdService
	]
})
export class UsersModule {}
