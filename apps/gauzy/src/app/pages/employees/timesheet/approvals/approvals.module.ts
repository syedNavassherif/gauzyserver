// tslint:disable: nx-enforce-module-boundaries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	NbCardModule,
	NbButtonModule,
	NbSelectModule,
	NbDatepickerModule,
	NbContextMenuModule,
	NbIconModule,
	NbDialogModule,
	NbPopoverModule,
	NbSpinnerModule,
	NbCheckboxModule
} from '@nebular/theme';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from './../../../../@shared/shared.module';
import { TranslateModule } from './../../../../@shared/translate/translate.module';
import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals/approvals.component';
import { StatusBadgeModule } from './../../../../@shared/status-badge';
import { GauzyButtonActionModule } from './../../../../@shared/gauzy-button-action/gauzy-button-action.module';
import { NoDataMessageModule } from 'apps/gauzy/src/app/@shared/no-data-message/no-data-message.module';

@NgModule({
	declarations: [ApprovalsComponent],
	imports: [
		CommonModule,
		FormsModule,
		NbButtonModule,
		NbCardModule,
		NbCheckboxModule,
		NbContextMenuModule,
		NbDatepickerModule,
		NbDialogModule,
		NbIconModule,
		NbPopoverModule,
		NbSelectModule,
		NbSpinnerModule,
		TranslateModule,
		MomentModule,
		SharedModule,
		ApprovalsRoutingModule,
		StatusBadgeModule,
		GauzyButtonActionModule,
		NoDataMessageModule
	]
})
export class ApprovalsModule {}
