import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import {AuthService} from "../../../auth/services/auth.service";
import {provideRouter} from "@angular/router";

 describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
   let authService : jasmine.SpyObj<AuthService >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        provideRouter([]),
        { provide: AuthService, useValue: authService }
      ]
    }).overrideComponent(MainLayoutComponent,{})
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
