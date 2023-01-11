import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isNotEmpty } from '@gauzy/common-angular';

/**
 * custom validator to check that two fields match
 */
export class MatchValidator {
    
    static mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);

            // set error on matchingControl if validation fails
            if (isNotEmpty(control.value) && control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
            return null;
        };
    }
}