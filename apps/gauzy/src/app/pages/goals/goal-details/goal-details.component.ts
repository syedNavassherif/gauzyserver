import { Component, OnInit } from '@angular/core';
import { IGoal, IKeyResult, IKeyResultUpdate } from '@gauzy/contracts';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { EmployeesService } from '../../../@core/services';
import { KeyResultUpdateComponent } from '../keyresult-update/keyresult-update.component';
import { firstValueFrom } from 'rxjs';
import { KeyResultService } from '../../../@core/services/keyresult.service';
import { GoalService } from '../../../@core/services/goal.service';
import { AlertModalComponent } from '../../../@shared/alert-modal/alert-modal.component';
import { KeyResultDetailsComponent } from '../keyresult-details/keyresult-details.component';
import { ToastrService } from '../../../@core/services/toastr.service';
import { TranslationBaseComponent } from '../../../@shared/language-base/translation-base.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'ga-goal-details',
	templateUrl: './goal-details.component.html',
	styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent
	extends TranslationBaseComponent
	implements OnInit
{
	goal: IGoal;
	src: string;
	ownerName: string;
	updates: Array<IKeyResultUpdate> = [];
	constructor(
		private readonly dialogRef: NbDialogRef<GoalDetailsComponent>,
		private readonly employeeService: EmployeesService,
		private readonly dialogService: NbDialogService,
		private readonly keyResultService: KeyResultService,
		private readonly goalService: GoalService,
		private readonly toastrService: ToastrService,
		readonly translateService: TranslateService
	) {
		super(translateService);
	}

	async ngOnInit() {
		if (!!this.goal.ownerEmployee) {
			const employee = await firstValueFrom(this.employeeService.getEmployeeById(
				this.goal.ownerEmployee.id,
				['user']
			));
			this.src = employee.user.imageUrl;
			this.ownerName = employee.user.name;
		} else if (!!this.goal.organization) {
			this.ownerName = this.goal.organization.name;
			this.src = this.goal.organization.imageUrl;
		} else {
			this.ownerName = this.goal.ownerTeam.name;
		}

		this.goal.keyResults.forEach((keyResult) => {
			this.updates.push(...keyResult.updates);
		});
	}

	async deleteGoal() {
		const dialog = this.dialogService.open(AlertModalComponent, {
			context: {
				alertOptions: {
					title: this.getTranslation('GOALS_PAGE.DELETE_OBJECTIVE'),
					message: this.getTranslation('GOALS_PAGE.ARE_YOU_SURE'),
					status: 'danger'
				}
			},
			closeOnBackdropClick: false
		});
		const response = await firstValueFrom(dialog.onClose);
		if (!!response) {
			if (response === 'yes') {
				await this.goalService
					.delete(this.goal.id)
					.catch((error) => console.log(error));
				this.dialogRef.close('deleted');
			}
		}
	}

	calculateKeyResultWeight(weight) {
		const weightSum = this.goal.keyResults.reduce(
			(a, b) => a + +b.weight,
			0
		);
		return Math.round(+weight * (100 / weightSum));
	}

	async keyResultDetails(index, selectedKeyResult) {
		const dialog = this.dialogService.open(KeyResultDetailsComponent, {
			hasScroll: true,
			context: {
				keyResult: selectedKeyResult
			},
			closeOnBackdropClick: false
		});
		const response = await firstValueFrom(dialog.onClose);
		if (!!response) {
			if (response === 'deleted') {
				this.goal.keyResults.splice(index, 1);
				this.toastrService.danger(
					this.getTranslation('TOASTR.MESSAGE.KEY_RESULT_DELETED'),
					this.getTranslation('TOASTR.TITLE.SUCCESS')
				);
			} else if (!!index) {
				this.goal.keyResults[index] = response;
				this.goal.progress = this.calculateGoalProgress(
					this.goal.keyResults
				);
			}
		}
	}

	async keyResultUpdate(selectedKeyResult) {
		const dialog = this.dialogService.open(KeyResultUpdateComponent, {
			hasScroll: true,
			context: {
				keyResult: selectedKeyResult
			},
			closeOnBackdropClick: false
		});
		const response = await firstValueFrom(dialog.onClose);
		if (!!response) {
			const keyResultData = response;
			delete keyResultData.goal;
			delete keyResultData.updates;
			await this.keyResultService.update(
				selectedKeyResult.id,
				keyResultData
			);
			this.goal.progress = this.calculateGoalProgress(
				this.goal.keyResults
			);
		}
	}

	calculateGoalProgress(keyResults) {
		const progressTotal = keyResults.reduce(
			(a: number, b: IKeyResult) => a + b.progress * +b.weight,
			0
		);
		const weightTotal = keyResults.reduce((a, b) => a + +b.weight, 0);
		return Math.round(progressTotal / weightTotal);
	}

	closeDialog(isSaved: boolean) {
		isSaved ? this.dialogRef.close(this.goal) : this.dialogRef.close();
	}
}
