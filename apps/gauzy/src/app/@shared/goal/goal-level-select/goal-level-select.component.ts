import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GoalLevelEnum, IOrganizationTeam, IEmployee } from '@gauzy/contracts';
import { OrganizationTeamsService, Store } from '../../../@core';

@Component({
	selector: 'ga-goal-level-select',
	templateUrl: './goal-level-select.component.html',
	styleUrls: ['./goal-level-select.component.scss']
})
export class GoalLevelSelectComponent {

	@Input() parentFormGroup: FormGroup;
	@Input() orgId: string;
	@Input() teams: IOrganizationTeam[] = [];
	@Input() hideOrg = false;
	@Input() hideEmployee = false;
	@Input() hideTeam = false;
	@Input() helperText = '';
	@Input() employees: IEmployee[];
	@Input() orgName: string;
	@Input() enableHelperText = false;
	@Input() alignedGoal = false;

	goalLevelEnum = GoalLevelEnum;

	constructor(
		private readonly organizationTeamsService: OrganizationTeamsService,
		private readonly store: Store
	) {}

	async getTeams() {
		const { tenantId } = this.store.user;
		const { id: organizationId } = this.store.selectedOrganization;
		this.teams = (
			await this.organizationTeamsService.getAll(['members'], {
				organizationId,
				tenantId
			})
		).items;
	}

	selectEmployee(event, control) {
		if (this.alignedGoal) {
			this.parentFormGroup.patchValue({ alignedGoalOwner: event });
		} else {
			if (control === 'lead' && event !== '') {
				this.parentFormGroup.patchValue({ leadId: event });
			} else {
				this.parentFormGroup.patchValue({ ownerId: event });
			}
		}
	}
}
