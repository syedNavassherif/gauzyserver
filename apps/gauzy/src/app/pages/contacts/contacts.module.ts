import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbButtonModule,
	NbCardModule,
	NbDialogModule,
	NbIconModule,
	NbInputModule,
	NbTooltipModule,
	NbSelectModule,
	NbToggleModule,
	NbSpinnerModule,
	NbStepperModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
	InviteService,
	OrganizationContactService,
	OrganizationProjectsService
} from '../../@core/services';
import { CardGridModule } from '../../@shared/card-grid/card-grid.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { EmployeeMultiSelectModule } from '../../@shared/employee/employee-multi-select/employee-multi-select.module';
import { FileUploaderModule } from '../../@shared/file-uploader-input/file-uploader-input.module';
import { LeafletMapModule, LocationFormModule } from '../../@shared/forms';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { ImageUploaderModule } from '../../@shared/image-uploader/image-uploader.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { SharedModule } from '../../@shared/shared.module';
import { TagsColorInputModule } from '../../@shared/tags/tags-color-input/tags-color-input.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ContactMutationComponent } from './contact-mutation/contact-mutation.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { InviteContactComponent } from './invite-contact/invite-contact.component';
import { ContactActionComponent } from './table-components';

const COMPONENTS = [
	ContactsComponent,
	InviteContactComponent,
	ContactMutationComponent,
	ContactActionComponent
];

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,

		NbButtonModule,
		NbCardModule,
		NbDialogModule.forChild(),
		NbIconModule,
		NbInputModule,
		NbSelectModule,
		NbSpinnerModule,
		NbStepperModule,
		NbToggleModule,
		NbTooltipModule,

		Ng2SmartTableModule,
		NgSelectModule,

		CardGridModule,
		ContactsRoutingModule,
		EmployeeMultiSelectModule,
		FileUploaderModule,
		GauzyButtonActionModule,
		HeaderTitleModule,
		ImageUploaderModule,
		LeafletMapModule,
		LocationFormModule,
		PaginationModule,
		SharedModule,
		TagsColorInputModule,
		ThemeModule,
		TranslateModule
	],

	declarations: [...COMPONENTS],
	providers: [
		OrganizationContactService,
		OrganizationProjectsService,
		InviteService
	]
})
export class ContactsModule {}
