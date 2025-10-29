import { Injectable } from '@angular/core'
import {  
  FormControl,
  FormGroup,
} from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class HelpersService {

  constructor() { }

  getFormControlNgClass(
    form: FormGroup,
    controlName: string,
    className: string = '|'
  ): string {
    const control = form.get(controlName) as FormControl
    return this.generateNgClass(
      control.invalid && (control.dirty || control.touched),
      className
    )
  }

  generateNgClass(condition: boolean, className: string): string {
    return condition ? className : ''
  }
  
}
