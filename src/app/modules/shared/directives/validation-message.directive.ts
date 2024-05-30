import {Directive, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appValidationMessage]',
  standalone: true
})
export class ValidationMessageDirective implements OnChanges {
  @Input() control!: any;
  @HostBinding('innerText') text = '';


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      this.control?.statusChanges.subscribe(() => {
        this.text = '';
        if (this.control.invalid && (this.control.dirty || this.control.touched)) {
          if (this.control.errors?.['required']) {
            this.text = 'This field is required';
          } else if (this.control.errors?.['email']) {
            this.text = 'Please enter a valid email';
          }else if (this.control.errors?.['max']) {
            this.text = `Maximum value is ${this.control.errors['max'].max}`;
          }else if (this.control.errors?.['min']) {
            this.text = `Minimum value is ${this.control.errors['min'].min}`;
          }else if (this.control.errors?.['maxlength']) {
            this.text = `Maximum length is ${this.control.errors['maxlength'].requiredLength}`;
          }else if (this.control.errors?.['minlength']) {
            this.text = `Minimum length is ${this.control.errors['minlength'].requiredLength}`;
          }
        }
      });
    }
  }
}
