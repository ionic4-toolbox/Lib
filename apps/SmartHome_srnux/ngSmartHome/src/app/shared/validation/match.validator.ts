import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MatchValidators {

    static matchEntries(input1: string, input2: string): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let emailControl = c.get(input1);
            let confirmControl = c.get(input2);
            if (emailControl.pristine || confirmControl.pristine) {
                return null;
            }
            if (emailControl.value === confirmControl.value) {
                return null;
            }
            return { 'match': true };
        };
    }
}
