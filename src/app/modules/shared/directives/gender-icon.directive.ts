import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {GenderEnum} from "../../auth/enums/gender.enum";

@Directive({
  selector: '[appGenderIcon]',
  standalone: true
})
export class GenderIconDirective {

  @Input('appGenderIcon') gender!: GenderEnum;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const icon = this.gender === GenderEnum.MALE ? 'bi-gender-male' : this.gender === GenderEnum.FEMALE ?'bi-gender-female':'';
    this.renderer.addClass(this.el.nativeElement, icon);
  }

}
