import { FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const Confirmacion: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>{
    const password = control.get("password").value;
    const Cpass = control.get("confirmpassword").value;
    if (password !== Cpass ) {
        return { Diferente: true };
    }
    return null;
          
}