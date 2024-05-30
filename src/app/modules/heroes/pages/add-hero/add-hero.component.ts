import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject,
} from "rxjs";
import {NgIf, NgForOf} from "@angular/common";
import {StarRatingComponent} from "../../../shared/components/controls/star-rating/star-rating.component";
import {NgbTypeahead, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {HeroesService} from "../../services/heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {IProfile} from "../../interfaces/profile.interface";
import {Router} from "@angular/router";
import {ValidationMessageDirective} from "../../../shared/directives/validation-message.directive";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-hero',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    StarRatingComponent,
    NgbTypeaheadModule,
    ValidationMessageDirective
  ],
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.scss'
})
export class AddHeroComponent implements OnInit {
  @ViewChild('heroNameRef', {static: true}) heroNameSearch$!: NgbTypeahead;
  profilesList!: IProfile[];
  heroForm: FormGroup;
  focus$ = new Subject<string>();
  formatter = (x: IProfile) => x.fullName;
  hero: IHero | null | undefined;

  constructor(private readonly fb: FormBuilder, private readonly heroesService: HeroesService,
              private readonly toastr: ToastrService,
              private readonly router: Router) {
    this.heroForm = this.fb.group({
      profile: ['', Validators.required],
      powers: this.fb.array([this.createPower()])
    });

  }

  ngOnInit() {
    this.getHeroesList();
  }

  createPower(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }

  addPower(): void {
    this.powers.push(this.createPower());
  }

  removePower(index: number): void {
    this.powers.removeAt(index);
  }

  get powers(): FormArray {
    return this.heroForm.get('powers') as FormArray;
  }

  getControl(index: number) {
    return this.powers.controls[index].get('name');
  }

  getHeroesList(): void {
    this.heroesService.getProfiles().subscribe((profiles: IProfile[]) => this.profilesList = profiles);
  }

  search: OperatorFunction<string, readonly IProfile[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$).pipe(
      map((term) => (term === '' ? this.profilesList : this.profilesList.filter((v) =>
        v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
      ));
  };

  removeAllPowers(): void {
    for (let i = this.powers.controls.length - 1; i >= 0; i--) {
      this.removePower(i);
    }
  }

  resetHero() {
    this.removeAllPowers();
    this.addPower();
    this.hero = null;
  }

  fetchHero(id: string) {
    this.heroesService.getHeroByProfileId(id).subscribe((res) => {
      if (!res) return;
      this.updateHeroAndPowers(res);
    });
  }

  updateHeroAndPowers(res: IHero) {
    this.hero = res;
    res.powers.forEach(() => this.addPower());
    this.heroForm.patchValue({powers: res.powers});
  }

  onSelect(item: IProfile) {
    this.resetHero();
    this.fetchHero(item.id);
  }

  onSubmit() {
    if (this.heroForm.invalid || !this.heroForm.get('powers')?.value!.length) return;
    if (this.hero) {
      this.onUpdate();
    } else {
      this.onAddNew();
    }
  }

  /**
   * Rewrites the form values into a payload for the hero service for api call.
   *
   * @returns {Object} - The payload object containing the profile ID and powers.
   *
   * This method performs the following steps:
   * - Retrieves the values from the hero form.
   * - Constructs a payload object with the profile ID and powers from the form values.
   * - Returns the payload object.
   */
  rewritePayload(): { profileId: string, powers: string[] } {
    const formValue = this.heroForm.value;
    const payload: { profileId: string, powers: string[] } = {
      profileId: formValue.profile.id,
      powers: formValue.powers
    };
    return payload;
  }

  onAddNew(): void {
    this.heroesService.addHero(this.rewritePayload()).subscribe(() => {
      this.toastr.success('Hero added successfully');
      this.navigateBack();
    });
  }

  onUpdate(): void {
    this.heroesService.updateHero(this.rewritePayload(), this.hero!['id']).subscribe(() => {
      this.toastr.success('Hero updated successfully');
      this.navigateBack();
    });
  }

  navigateBack(): void {
    this.router.navigate(['/manage']);
  }
}
