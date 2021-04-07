import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (user: FormGroup) => {
        const control = user.controls[controlName];
        const matchingControl = user.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}