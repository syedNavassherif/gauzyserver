import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { TranslateModule } from '../../@shared/translate/translate.module';

@NgModule({
	imports: [
		AboutRoutingModule,
		ThemeModule,
		NbCardModule,
		FormsModule,
		NbButtonModule,
		NbInputModule,
		TranslateModule
	],
	declarations: [AboutComponent]
})
export class AboutModule {}
