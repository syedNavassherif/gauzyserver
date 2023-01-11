import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsEnum } from '@gauzy/contracts';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { FileStorageComponent } from './file-storage.component';

const routes: Routes = [
	{
		path: '',
		component: FileStorageComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.FILE_STORAGE_VIEW],
				redirectTo: '/pages/settings'
			},
			selectors: {
				project: false,
				employee: false,
				organization: false,
				date: false
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FileStorageRoutingModule {}
