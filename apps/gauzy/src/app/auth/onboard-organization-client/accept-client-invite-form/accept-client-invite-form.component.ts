import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	IInvite,
	IOrganizationContactRegistrationInput,
	ITenant,
	IOrganizationCreateInput,
	ITag
} from '@gauzy/contracts';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { MatchValidator } from '../../../@core/validators';
import { FormHelpers } from '../../../@shared/forms';
import { TranslationBaseComponent } from '../../../@shared/language-base/translation-base.component';
import { OrganizationsMutationComponent } from '../../../@shared/organizations/organizations-mutation/organizations-mutation.component';

@Component({
	selector: 'ga-accept-client-invite-form',
	templateUrl: 'accept-client-invite-form.component.html',
	styleUrls: ['accept-client-invite-form.component.scss']
})
export class AcceptClientInviteFormComponent
	extends TranslationBaseComponent
	implements OnInit, OnDestroy {

	FormHelpers: typeof FormHelpers = FormHelpers;

	@Input()
	invitation: IInvite;

	@Output()
	submitForm = new EventEmitter<IOrganizationContactRegistrationInput>();

	tenant: ITenant;
	tags: ITag[];

	organizationCreateInput: IOrganizationCreateInput;
	addedOrganization: boolean;

	public readonly form: FormGroup = AcceptClientInviteFormComponent.buildForm(this.fb);
	static buildForm(fb: FormBuilder): FormGroup {
		return fb.group({
			fullName: ['', Validators.required],
			password: ['', Validators.compose([
					Validators.required,
					Validators.minLength(4)
				])
			],
			repeatPassword: ['', Validators.required],
			agreeTerms: [false, Validators.requiredTrue]
		}, {
			validators: [
				MatchValidator.mustMatch(
					'password',
					'repeatPassword'
				)
			]
		});
	}

	constructor(
		private readonly fb: FormBuilder,
		private readonly dialogService: NbDialogService,
		public readonly translateService: TranslateService
	) {
		super(translateService);
	}

	ngOnInit(): void { }

	async addClientOrganization() {
		this.organizationCreateInput = await firstValueFrom(
			this.dialogService
			.open(OrganizationsMutationComponent, {
				closeOnBackdropClick: false
			})
			.onClose
		);
		this.addedOrganization = !!this.organizationCreateInput;
	}

	createClient() {
		if (this.form.invalid) {
			return;
		}
		if (this.addedOrganization) {
			const { fullName, password } = this.form.getRawValue();
			this.submitForm.emit({
				user: {
					firstName: fullName
						? fullName.split(' ').slice(0, -1).join(' ')
						: null,
					lastName: fullName
						? fullName.split(' ').slice(-1).join(' ')
						: null,
					email: this.invitation.email,
					role: this.invitation.role,
					tenant: this.tenant,
					tags: this.tags
				},
				password,
				contactOrganization: this.organizationCreateInput
			});
		}
	}

	ngOnDestroy(): void {}
}
