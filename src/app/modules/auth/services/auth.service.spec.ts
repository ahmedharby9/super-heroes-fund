import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {BASE_API_URL} from "../../core/constants/injection.tokens";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {provide: BASE_API_URL, useValue: 'http://localhost:3000'}
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should authenticate user when valid credentials are provided', () => {
    const loginInfo = {username: 'test', password: 'test'};
    const mockResponse = [{username: 'test', password: 'test'}];

    service.login(loginInfo).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/users?_embed=role&auth=test:test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should throw error when invalid credentials are provided', () => {
    const loginInfo = {username: 'invalid', password: 'invalid'};
    const mockErrorResponse = 'Invalid username or password';

    service.login(loginInfo).subscribe(
      () => fail('Expected to fail, but succeeded'),
      error => expect(error.message).toEqual(mockErrorResponse)
    );

    const req = httpMock.expectOne('http://localhost:3000/users?_embed=role&auth=invalid:invalid');
    expect(req.request.method).toBe('GET');
    req.flush([], {status: 200, statusText: 'Ok'});
  });

  it('should logout the user', () => {
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });
});
