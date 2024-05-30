import {Component, Input, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {GenderIconDirective} from "../../../shared/directives/gender-icon.directive";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {StarRatingComponent} from "../../../shared/components/controls/star-rating/star-rating.component";
import {AuthService} from "../../../auth/services/auth.service";
import {IHeroPower} from "../../interfaces/hero-power.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-hero-profile',
  standalone: true,
  imports: [NgForOf, NgIf, GenderIconDirective, NgOptimizedImage, ReactiveFormsModule, StarRatingComponent, DecimalPipe],
  templateUrl: './hero-profile.component.html',
  styleUrl: './hero-profile.component.scss'
})
export class HeroProfileComponent implements OnInit {
  @Input() id!: string;
  profileDetails: IHero | undefined;
  isRatingDisabled: boolean = false;
  heroForm!: FormGroup;

  constructor(private readonly heroService: HeroesService,
              private readonly toastr: ToastrService,
              private readonly auth: AuthService, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.heroForm = this.fb.group({
      powers: this.fb.array([])
    });
    this.heroService.getHero(this.id).subscribe((hero: IHero) => {
      this.profileDetails = hero;
      this.isRatingDisabled = this.isRatingDisabledCheck(hero);
      this.addPowers(hero.powers);
    });
  }

  /**
   * Checks if the rating is disabled for the current user based on the hero's profile.
   *
   * @param {IHero} hero - The hero object containing the profile details.
   *
   * @returns {boolean} - Returns true if the rating is disabled for the current user, false otherwise.
   *
   * The function works as follows:
   * - It retrieves the ID of the current user.
   * - It checks if the user's ID is the same as the ID of the user who created the hero's profile. If it is, the function returns true.
   * - It checks if the 'usersRated' array of the hero's profile includes the user's ID. If it does, the function returns true.
   * - If neither of the above conditions are met, the function returns false.
   */
  isRatingDisabledCheck(hero: IHero): boolean {
    const userId = this.auth.getUserInfo().id;
    return userId == hero.profile.userId || hero.usersRated?.includes(userId)!;
  }

  get powers() {
    return this.heroForm?.get('powers') as FormArray;
  }

  addPowers(powersRating: IHeroPower[]) {
    powersRating?.forEach((power) => {
      this.powers?.push(this.fb.group({
        name: power.name,
        rating: this.isRatingDisabled ? power.rating : 0,
      }));
    });
  }

  onSubmit() {
    if (this.heroForm.valid) {
      this.updateProfileDetails();
      const payload = this.preparePayload();
      this.heroService.updateHero(payload, this.profileDetails!.id).subscribe((res: any) => {
        this.toastr.success('Rating is submitted successfully!');
        this.isRatingDisabled = true;
        this.profileDetails = {profile: this.profileDetails?.profile, ...res};
      });
    }
  }

  /**
   * Updates the profile details of the hero rating.
   *
   * This method is called when the user submits the form and the form is valid.
   * It performs the following steps:
   * - Initializes the 'usersRated' array of the profile details if it is not already initialized.
   * - Adds the current user's ID to the 'usersRated' array.
   * - Iterates over the 'powers' array of the profile details.
   * - For each power, it retrieves the user's rating from the form and updates the power's rating.
   * - If the power already has a rating, it calculates the average of the old rating and the user's rating.
   * - If the power does not have a rating, it sets the power's rating to the user's rating.
   */
  updateProfileDetails() {
    this.profileDetails!.usersRated = this.profileDetails!.usersRated || [];
    this.profileDetails!.usersRated.push(this.auth.getUserInfo()?.id);
    this.profileDetails?.powers?.forEach((power, index) => {
      const userRating = this.heroForm.value.powers[index].rating;
      power.rating = power.rating ? this.calculateAverageRating(power.rating, userRating) : userRating;
    });
  }

  calculateAverageRating(oldRating: number, newRating: number): number {
    return Math.round((oldRating + newRating) / this.profileDetails!.usersRated.length);
  }

  preparePayload(): any {
    const payload: any = {...this.profileDetails};
    delete payload.profile;
    payload.totalRating = this.calculateTotalRating(payload.powers);
    return payload;
  }

  calculateTotalRating(powers: any[]): number {
    const totalRating = powers?.reduce((sum, power) => sum + power.rating, 0);
    return totalRating / powers?.length;
  }

}
