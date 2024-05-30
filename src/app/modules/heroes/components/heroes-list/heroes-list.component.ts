import {Component, Input} from '@angular/core';
import {StarRatingComponent} from "../../../shared/components/controls/star-rating/star-rating.component";
import {CommonModule} from "@angular/common";
import {ArrayToStringPipe} from "../../../shared/pipes/array-to-string.pipe";
import {IHero} from "../../interfaces/hero.interface";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [StarRatingComponent, CommonModule, ArrayToStringPipe, RouterLink],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent {
  @Input() heroesList!: IHero[];

  constructor() {
  }

}
