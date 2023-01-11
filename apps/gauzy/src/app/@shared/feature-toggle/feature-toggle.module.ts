import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureToggleComponent } from './feature-toggle.component';
import { FeatureService } from '../../@core/services/feature/feature.service';
import { FeatureStoreService } from '../../@core/services/feature/feature-store.service';
import {
	NbButtonModule,
	NbCardModule,
	NbCheckboxModule,
	NbIconModule,
	NbListModule,
	NbSpinnerModule,
	NbToggleModule
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
	imports: [
		CommonModule,
		NbButtonModule,
		NbCardModule,
		NbCheckboxModule,
		NbIconModule,
		NbListModule,
		NbSpinnerModule,
		NbToggleModule,
		ThemeModule,
		TranslateModule
	],
	declarations: [FeatureToggleComponent],
	exports: [FeatureToggleComponent],
	providers: [FeatureService, FeatureStoreService]
})
export class FeatureToggleModule {}
