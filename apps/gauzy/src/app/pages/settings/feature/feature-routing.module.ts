import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionsEnum } from '@gauzy/contracts';
import { FeatureToggleComponent } from '../../../@shared/feature-toggle/feature-toggle.component';
import { FeatureComponent } from './feature.component';

export function redirectTo() {
	return '/pages/dashboard';
}

const routes: Routes = [
	{
		path: '',
		component: FeatureComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW],
				redirectTo
			}
		},
		children: [
			{
				path: '',
				redirectTo: 'tenant',
				pathMatch: 'full'
			},
			{
				path: 'tenant',
				component: FeatureToggleComponent,
				data: {
					isOrganization: false,
					selectors: {
						project: false,
						employee: false,
						date: false,
						organization: false
					}
				}
			},
			{
				path: 'organization',
				component: FeatureToggleComponent,
				data: {
					isOrganization: true,
					selectors: {
						project: false,
						employee: false,
						date: false,
						organization: true
					}
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FeatureRoutingModule {}
