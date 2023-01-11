import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {
	NbCardModule,
	NbButtonModule,
	NbInputModule,
	NbIconModule,
	NbDialogModule,
	NbActionsModule,
	NbBadgeModule,
	NbSpinnerModule,
	NbTooltipModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorsComponent } from './vendors.component';
import { OrganizationVendorsService } from '../../@core/services/organization-vendors.service';
import { VendorsRoutingModule } from './vendors-routing.module';
import { TagsColorInputModule } from '../../@shared/tags/tags-color-input/tags-color-input.module';
import { TableComponentsModule } from '../../@shared/table-components/table-components.module';
import { CardGridModule } from '../../@shared/card-grid/card-grid.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../@shared/shared.module';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoDataMessageModule } from '../../@shared/no-data-message/no-data-message.module';


@NgModule({
	imports: [
		ThemeModule,
		NbCardModule,
		ReactiveFormsModule,
		FormsModule,
		NbButtonModule,
		NbInputModule,
		NbIconModule,
		NbTooltipModule,
		TagsColorInputModule,
		NbActionsModule,
		TableComponentsModule,
		VendorsRoutingModule,
		NbBadgeModule,
		CardGridModule,
		NbDialogModule,
		SharedModule,
		Ng2SmartTableModule,
		NbDialogModule.forChild(),
		TranslateModule,
		HeaderTitleModule,
		GauzyButtonActionModule,
		NbSpinnerModule,
		InfiniteScrollModule,
		NoDataMessageModule
	],
	declarations: [VendorsComponent],
	providers: [OrganizationVendorsService]
})
export class VendorsModule {}
