import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	NbButtonModule,
	NbCardModule,
	NbInputModule,
	NbSelectModule,
	NbSpinnerModule
} from '@nebular/theme';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SMTPComponent } from './smtp.component';
import { CustomSmtpService } from '../../@core/services/custom-smtp.service';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
	imports: [
		FormsModule,
		NbButtonModule,
		NbCardModule,
		NbInputModule,
		NbSelectModule,
		NbSpinnerModule,
		ReactiveFormsModule,
		ThemeModule,
		TranslateModule,
		NgxPermissionsModule.forChild()
	],
	exports: [SMTPComponent],
	declarations: [SMTPComponent],
	providers: [CustomSmtpService]
})
export class SMTPModule {}
