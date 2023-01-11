import { CardGridModule } from './../../@shared/card-grid/card-grid.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@shared/shared.module';
import { BackNavigationModule } from '../../@shared/back-navigation/back-navigation.module';
import { EquipmentSharingPolicyComponent } from './equipment-sharing-policy.component';
import { EquipmentSharingPolicyService } from '../../@core/services/equipment-sharing-policy.service';
import { EquipmentSharingPolicyRoutingModule } from './equipment-sharing-policy.routing.module';
import { EquipmentSharingPolicyMutationModule } from '../../@shared/equipment-sharing-policy/equipment-sharing-policy-mutation.module';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { TableComponentsModule } from '../../@shared/table-components/table-components.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ThemeModule,
		NbBadgeModule,
		NbButtonModule,
		NbCardModule,
		NbCheckboxModule,
		NbDialogModule.forChild(),
		NbIconModule,
		NbInputModule,
		NbRouteTabsetModule,
		NbSelectModule,
		NbSpinnerModule,
		Ng2SmartTableModule,
		NbTooltipModule,
		NbRadioModule,
		CardGridModule,
		EquipmentSharingPolicyMutationModule,
		BackNavigationModule,
		EquipmentSharingPolicyRoutingModule,
		TranslateModule,
		HeaderTitleModule,
		GauzyButtonActionModule,
		PaginationModule,
		TableComponentsModule
	],
	declarations: [EquipmentSharingPolicyComponent],
	providers: [EquipmentSharingPolicyService]
})
export class EquipmentSharingPolicyModule {}
