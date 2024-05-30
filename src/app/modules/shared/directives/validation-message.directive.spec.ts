import {ValidationMessageDirective} from './validation-message.directive';
import {SimpleChange} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {fakeAsync} from "@angular/core/testing";

describe('ValidationMessageDirective', () => {
  let directive: ValidationMessageDirective;
  let control: FormControl;

  beforeEach(() => {
    directive = new ValidationMessageDirective();
  });

  it('should display required message when control is required and not touched', () => {
    control = new FormControl('test', Validators.required);
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, true)
    });
    directive.control.setValue(null);
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('This field is required');
  });

  it('should display email message when control has invalid email', () => {
    control = new FormControl('invalid', Validators.email);
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, true)
    });
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('Please enter a valid email');
  });

  it('should display max value message when control value exceeds maximum', () => {
    control = new FormControl(11, Validators.max(10));
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, true)
    });
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('Maximum value is 10');
  });

  it('should display min value message when control value is less than minimum', () => {
    control = new FormControl(0, Validators.min(1));
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, true)
    });
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('Minimum value is 1');
  });

  it('should display max length message when control value length exceeds maximum', () => {
    control = new FormControl('123456', Validators.maxLength(5));
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, true)
    });
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('Maximum length is 5');
  });

  it('should display min length message when control value length is less than minimum', fakeAsync(async () => {
    control = new FormControl('123', Validators.minLength(4));
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, false)
    });
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('Minimum length is 4');
  }));

  it('should not display any message when control is valid', () => {
    control = new FormControl('valid@email.com', Validators.email);
    directive.control = control;
    directive.ngOnChanges({
      control: new SimpleChange(null, control, true)
    });
    directive.control.markAsTouched();
    directive.control.updateValueAndValidity();
    expect(directive.text).toBe('');
  });
});
