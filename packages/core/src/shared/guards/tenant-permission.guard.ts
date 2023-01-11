import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsEnum, RolesEnum } from '@gauzy/contracts';
import { environment as env } from '@gauzy/config';
import { isNotEmpty, PERMISSIONS_METADATA, removeDuplicates } from '@gauzy/common';
import { RequestContext } from './../../core/context';
import { TenantService } from './../../tenant/tenant.service';
import { TenantBaseGuard } from './tenant-base.guard';

@Injectable()
export class TenantPermissionGuard extends TenantBaseGuard
	implements CanActivate {

	constructor(
		protected readonly _reflector: Reflector,
		private readonly _tenantService: TenantService
	) {
		super(_reflector);
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const currentTenantId = RequestContext.currentTenantId();
		let isAuthorized = false;
		if (!currentTenantId) {
			return isAuthorized;
		}

		// Basically if this guard is true then try the check tenant permissions.
		isAuthorized = await super.canActivate(context);
		if (!isAuthorized) {
			return isAuthorized;
		}

		//Enabled AllowSuperAdminRole from .env file
		if (env.allowSuperAdminRole === true) {
			//Super admin and admin has allowed to access request
			const isSuperAdmin = RequestContext.hasRoles([
				RolesEnum.SUPER_ADMIN
			]);
			if (isSuperAdmin === true) {
				isAuthorized = isSuperAdmin;
				return isAuthorized;
			}
		}
		/*
		* Retrieve metadata for a specified key for a specified set of permissions
		*/
		const permissions = removeDuplicates(this._reflector.getAllAndOverride<PermissionsEnum[]>(PERMISSIONS_METADATA, [
			context.getHandler(),
			context.getClass(),
		])) || [];
		if (isNotEmpty(permissions)) {
			const tenant = await this._tenantService.findOneByIdString(currentTenantId, {
				relations: {
					rolePermissions: true
				}
			});
			isAuthorized = !!tenant.rolePermissions.find(
				(p) => permissions.indexOf(p.permission) > -1 && p.enabled
			);
		}
		if (!isAuthorized) {
			console.log(
				'Unauthorized access blocked. TenantId:',
				currentTenantId,
				' Permissions Checked:',
				permissions
			);
		}
		return isAuthorized;
	}
}
