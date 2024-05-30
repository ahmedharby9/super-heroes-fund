import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).overrideComponent(StarRatingComponent,{}).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update rating when setRating is called and readonly is false', () => {
    component.readonly = false;
    component.setRating(3);
    expect(component.rating).toBe(3);
  });

  it('should not update rating when setRating is called and readonly is true', () => {
    component.readonly = true;
    component.setRating(3);
    expect(component.rating).toBe(0);
  });

  it('should update rating when writeValue is called', () => {
    component.writeValue(4);
    expect(component.rating).toBe(4);
  });

  it('should call onChange when rating is set', () => {
    let ratingValue = 0;
    component.registerOnChange((value: number) => ratingValue = value);
    component.rating = 5;
    expect(ratingValue).toBe(5);
  });
});
