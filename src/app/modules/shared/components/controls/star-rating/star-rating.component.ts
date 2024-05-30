import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  /**
   * Input property that determines if the star rating component is read-only.
   * If true, the user cannot change the rating value.
   * Default value is false.
   */

  @Input() readonly: boolean = false;

  /**
   * Setter for the 'rating' input property.
   * This method is called whenever the parent component changes the value of the 'rating' property.
   * If the new rating value is different from the current rating value, it updates the current rating value and calls the 'onChange' method.
   *
   * @param {number} value - The new rating value.
   */
  @Input() set rating(value: number) {
    if (this._rating !== value) {
      this._rating = value;
      this.onChange(value);
    }
  }

  private _rating: number = 0;
  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };

  get rating(): number {
    return this._rating;
  }

  setRating(value: number): void {
    if (this.readonly) return;
    this.rating = value;
  }

  writeValue(value: number): void {
    this._rating = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
