import { CardGridModule } from './../../@shared/card-grid/card-grid.module';
import { NgModule } from '@angular/core';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import {
	NbCardModule,
	NbButtonModule,
	NbInputModule,
	NbIconModule,
	NbDialogModule,
	NbSpinnerModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableComponentsModule } from '../../@shared/table-components/table-components.module';
import { EquipmentComponent } from './equipment.component';
import { EquipmentService } from '../../@core/services/equipment.service';
import { EquipmentMutationModule } from '../../@shared/equipment/equipment-mutation.module';
import { UserFormsModule } from '../../@shared/user/forms/user-forms.module';
import { AutoApproveComponent } from './auto-approve/auto-approve.component';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';

@NgModule({
	imports: [
		EquipmentRoutingModule,
		ThemeModule,
		UserFormsModule,
		NbCardModule,
		FormsModule,
		NbButtonModule,
		NbInputModule,
		NbIconModule,
		Ng2SmartTableModule,
		NbDialogModule.forChild(),
		EquipmentMutationModule,
		TableComponentsModule,
		CardGridModule,
		TranslateModule,
		NbSpinnerModule,
		HeaderTitleModule,
		PaginationModule,
		GauzyButtonActionModule
	],
	providers: [EquipmentService],
	declarations: [EquipmentComponent, AutoApproveComponent]
})
export class EquipmentModule {}
