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
	NbActionsModule,
	NbSpinnerModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@shared/shared.module';
import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { FileUploaderModule } from '../../@shared/file-uploader-input/file-uploader-input.module';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { CardGridModule } from '../../@shared/card-grid/card-grid.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableComponentsModule } from '../../@shared/table-components/table-components.module';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { NoDataMessageModule } from '../../@shared/no-data-message/no-data-message.module';


const COMPONENTS = [DocumentsComponent, UploadDocumentComponent];

@NgModule({
	imports: [
		SharedModule,
		DocumentsRoutingModule,
		ThemeModule,
		NbCardModule,
		FormsModule,
		ReactiveFormsModule,
		NbButtonModule,
		NbInputModule,
		NbSelectModule,
		NbIconModule,
		NbActionsModule,
		CardGridModule,
		TableComponentsModule,
		Ng2SmartTableModule,
		NbDialogModule.forChild(),
		NbTooltipModule,
		FileUploaderModule,
		NgSelectModule,
		NbSpinnerModule,
		TranslateModule,
		HeaderTitleModule,
		PaginationModule,
		GauzyButtonActionModule,
		NoDataMessageModule 
	],
	declarations: [...COMPONENTS],
	providers: []
})
export class DocumentsModule {}
