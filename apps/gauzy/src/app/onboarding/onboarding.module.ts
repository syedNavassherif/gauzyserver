import { NgModule } from '@angular/core';
import { NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { RoleGuard } from '../@core/guards';
import { AuthService } from '../@core/services/auth.service';
import { TranslateModule } from '../@shared/translate/translate.module';
import { ThemeSettingsModule } from '../@theme/components/theme-sidebar/theme-settings/theme-settings.module';
import { ThemeModule } from '../@theme/theme.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';

@NgModule({
	imports: [
		OnboardingRoutingModule,
		ThemeModule,
		NbLayoutModule,
		TranslateModule,
		NbSpinnerModule,
		ThemeSettingsModule
	],
	declarations: [OnboardingComponent],
	providers: [AuthService, RoleGuard]
})
export class OnboardingModule {}
