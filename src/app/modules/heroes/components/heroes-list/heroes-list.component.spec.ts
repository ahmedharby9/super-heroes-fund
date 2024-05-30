import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesListComponent} from './heroes-list.component';
import {By} from '@angular/platform-browser';
import {IHero} from "../../interfaces/hero.interface";
import {GenderEnum} from "../../../auth/enums/gender.enum";
import {provideRouter} from "@angular/router";

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        provideRouter([])
      ]
    }).overrideComponent(HeroesListComponent,{}).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display heroes when heroesList input is set', () => {
    (component.heroesList as IHero[]) = [
      {
        id: '1',
        profile: {
          id: '1',
          fullName: 'test',
          city: '',
          profileId: '',
          userId: '',
          age: 0,
          gender: GenderEnum.FEMALE,
          address: '',
          email: '',
          phone: '',
          summary: '',
          avatar: ''
        },
        profileId: '',
        totalRating: 2,
        powers: [{
          rating:2,
          name: 'power',
          id: 1
        }],
        usersRated: ['1']
      }
    ];
    fixture.detectChanges();
    const heroElements = fixture.debugElement.queryAll(By.css('.rated'));
    expect(heroElements.length).toBe(2);
  });

  it('should not display any heroes when heroesList input is empty', () => {
    component.heroesList = [];
    fixture.detectChanges();
    const heroElements = fixture.debugElement.queryAll(By.css('.hero'));
    expect(heroElements.length).toBe(0);
  });
});
