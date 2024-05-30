import { GenderIconDirective } from './gender-icon.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { GenderEnum } from "../../auth/enums/gender.enum";

describe('GenderIconDirective', () => {
  let directive: GenderIconDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj('Renderer2', ['addClass']);
    directive = new GenderIconDirective(elementRef, renderer);
  });

  it('should add male class when gender is male', () => {
    directive.gender = GenderEnum.MALE;
    directive.ngOnChanges();
    expect(renderer.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bi-gender-male');
  });

  it('should add female class when gender is female', () => {
    directive.gender = GenderEnum.FEMALE;
    directive.ngOnChanges();
    expect(renderer.addClass).toHaveBeenCalledWith(elementRef.nativeElement, 'bi-gender-female');
  });

});
