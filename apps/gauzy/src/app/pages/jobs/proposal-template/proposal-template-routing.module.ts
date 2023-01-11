import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsEnum } from '@gauzy/contracts';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProposalTemplateComponent } from './proposal-template/proposal-template.component';

const routes: Routes = [
	{
		path: '',
		component: ProposalTemplateComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ORG_PROPOSAL_TEMPLATES_VIEW],
				redirectTo: '/pages/jobs/search'
			},
			selectors: {
				project: false
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProposalTemplateRoutingModule {}
