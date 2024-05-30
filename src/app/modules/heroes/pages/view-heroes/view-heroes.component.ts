import {Component, OnInit, ViewChild} from '@angular/core';
import {HeroesListFilterComponent} from "../../components/heroes-list-filter/heroes-list-filter.component";
import {HeroesListComponent} from "../../components/heroes-list/heroes-list.component";
import {HeroesService} from "../../services/heroes.service";
import {IHero} from "../../interfaces/hero.interface";
import {RouterLink} from "@angular/router";
import {RoleDirective} from "../../../shared/directives/app-role.directive";
import {RolesEnum} from "../../../auth/enums/roles.enum";

@Component({
  selector: 'app-view-heroes',
  standalone: true,
  imports: [HeroesListFilterComponent, HeroesListComponent, RouterLink, RoleDirective],
  templateUrl: './view-heroes.component.html',
  styleUrl: './view-heroes.component.scss'
})
export class ViewHeroesComponent implements OnInit {
  heroesList!: IHero[];
  filteredHeroesList!: IHero[];
  rolesEnum = RolesEnum;

  constructor(private readonly heroesService: HeroesService) {
  }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((heroes: IHero[]) => {
      this.heroesList = heroes;
      this.filteredHeroesList = [...heroes];
      this.onSortChange('name');
    });
  }

  onFilterChange(filter: string): void {
    this.filteredHeroesList = filter ? this.heroesList.filter(hero =>
      hero.profile.fullName.includes(filter) || hero.powers?.some((power: any) => power.name.includes(filter))) : this.heroesList;
  }

  onSortChange(sort: string): void {
    this.filteredHeroesList.sort((a, b) => {
      if (sort === 'power') {
        return this.comparePowers(a, b);
      }
      return this.compareNames(a, b);
    });
  }
  comparePowers(a: IHero, b: IHero): number {
    const aPowersName = this.getPowersName(a);
    const bPowersName = this.getPowersName(b);
    return aPowersName.localeCompare(bPowersName);
  }

  getPowersName(hero: IHero): string {
    return hero.powers.map(power => power.name).sort().join(', ');
  }

  compareNames(a: IHero, b: IHero): number {
    return -b.profile.fullName.localeCompare(a.profile.fullName);
  }
}
