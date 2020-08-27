import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { UserResponse, User } from '@shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(authData: User): Observable<any> {
    return this.http.post<UserResponse>(`${environment.API_URL}`, authData)
    .pipe( (res: UserResponse) =>  )
  }

  logout(): void {

  }

  private readToken(): void {

  }

  private saveToken(): void {

  }

  private handleError(): void {

  }

}
