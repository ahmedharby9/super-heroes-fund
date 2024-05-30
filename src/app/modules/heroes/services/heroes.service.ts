import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_API_URL} from "../../core/constants/injection.tokens";
import {map, Observable} from "rxjs";
import {IHero} from "../interfaces/hero.interface";
import {IProfile} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(@Inject(BASE_API_URL) private readonly baseUrl: string, private readonly http: HttpClient) {
  }

  getHero(id: string): Observable<IHero> {
    return this.http.get<IHero>(`${this.baseUrl}/heroes/${id}?_embed=profile`);
  }

  getHeroByProfileId(profileId: string): Observable<IHero> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes?profileId=${profileId}`)
      .pipe(map(heroes => heroes[0]));
  }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes?_embed=profile`);
  }

  getProfiles(): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(`${this.baseUrl}/profiles`);
  }

  addHero(payload: any) {
    return this.http.post(`${this.baseUrl}/heroes`, payload);
  }

  updateHero(payload: any, heroId: string) {
    return this.http.put(`${this.baseUrl}/heroes/${heroId}`, payload);
  }

}
