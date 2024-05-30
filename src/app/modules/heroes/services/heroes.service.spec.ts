import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { BASE_API_URL } from '../../core/constants/injection.tokens';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroesService,
        { provide: BASE_API_URL, useValue: 'http://localhost:3000' }
      ]
    });

    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch hero by id', () => {
    const mockHero:any = { id: '1', name: 'Hero One' };

    service.getHero('1').subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes/1?_embed=profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should fetch hero by profile id', () => {
    const mockHeroes:any = [{ id: '1', name: 'Hero One', profileId: '1' }];

    service.getHeroByProfileId('1').subscribe(hero => {
      expect(hero).toEqual(mockHeroes[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes?profileId=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should fetch all heroes', () => {
    const mockHeroes:any = [{ id: '1', name: 'Hero One' }, { id: '2', name: 'Hero Two' }];

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes?_embed=profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should fetch all profiles', () => {
    const mockProfiles:any = [{ id: '1', name: 'Profile One' }, { id: '2', name: 'Profile Two' }];

    service.getProfiles().subscribe(profiles => {
      expect(profiles).toEqual(mockProfiles);
    });

    const req = httpMock.expectOne('http://localhost:3000/profiles');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfiles);
  });

  it('should add a new hero', () => {
    const mockHero = { id: '1', name: 'Hero One' };

    service.addHero(mockHero).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('POST');
    req.flush(mockHero);
  });

  it('should update a hero', () => {
    const mockHero = { id: '1', name: 'Updated Hero' };

    service.updateHero(mockHero, '1').subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockHero);
  });
});
